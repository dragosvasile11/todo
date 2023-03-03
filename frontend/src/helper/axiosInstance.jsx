import axios from 'axios'
import toastr from "toastr";
import 'toastr/build/toastr.min.css'

const baseURL = import.meta.env.VITE_REACT_APP_BASE_URL


const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {'Content-Type': 'application/json'}
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        const { config, response } = error;

        if (response && response.status === 400) {
            if (response.data.errors) {
                let errorMessages = "";
                if (Array.isArray(response.data.errors)) {
                    response.data.errors.forEach((error, index) => {
                        errorMessages += `${index + 1}. ${error.message}\n`;
                    });
                }
                toastr.error(`${error.response.data.message}: \n${errorMessages}`, "");
            } else {
                toastr.error(response.data, "");
            }

        } else if (response && response.status === 404) {
            toastr.error(error.response.data);
        } else if (!config.isRetry && response && response.status >= 500) {
            config.isRetry = true;
            return axiosInstance(config);
        } else if (error.code === "ERR_NETWORK") {
            toastr.error(`${error.message}: contact support team!`);
        }

        return Promise.reject(error);
    }
);

export async function getTasks() {
    try {
        const response = await axiosInstance.get('/api/tasks');
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function addTask(formData) {
    try {
        const response = await axiosInstance.post('/api/tasks', formData);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteTask(taskId) {
    try {
        const response = await axiosInstance.delete(`/api/tasks/${taskId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function updateTask(updatedTask) {
    try {
        const response = await axiosInstance.patch(`/api/tasks/${updatedTask.id}`, updatedTask);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


import React, {useEffect, useState} from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBRow,
} from "mdb-react-ui-kit";
import Task from "./components/Task.jsx";
import { getTasks, addTask, deleteTask, updateTask } from './helper/axiosInstance.jsx'
import Modal from "./components/Modal.jsx";
import UserInfo from "./components/UserInfo.jsx";
import AddTaskButton from "./components/AddTaskButton.jsx";
import Title from "./components/Title.jsx";
import FilterButton from "./components/FilterButton.jsx";

const emptyForm = {
    name: '',
    type: null,
    deadlineDate: null,
    estimatedTime: null,
};

export default function App() {

    const [isFinishedModal, setIsFinishedModal] = useState(false);
    const [workingTime, setWorkingTime] = useState(null);
    const [isModal, setIsModal] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [taskToUpdate, setTaskToUpdate] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [formData, setFormData] = useState(emptyForm);

    const handleSortToggle = () => { // setSortOrder
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const icon = sortOrder === 'desc' ? 'sort-amount-down-alt' : 'sort-amount-up-alt';
    const title = sortOrder === 'desc' ? 'Sort by date Ascending' : 'Sort by date Descending';

    function sortTasks() {
        const sortedTasks = tasks.slice().sort((task1, task2) => { // array destruct
            const date1 = new Date(task1.deadlineDate).getTime();
            const date2 = new Date(task2.deadlineDate).getTime();

            if (sortOrder === 'asc') return date1 - date2;
            else return date2 - date1;
        });
        setTasks(sortedTasks);
    }

    useEffect(() => {
        sortTasks();
    }, [sortOrder]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const data = await getTasks();
            setTasks(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleAddTask(formData) {
        try {
            await addTask(formData);
            await fetchData()
        } catch (error) {
            console.log(error);
        }
        setIsModal(false);
    }

    async function handleDeleteTask(taskId) {
        try {
            await deleteTask(taskId);
            await fetchData()
        } catch (error) {
            console.log(error);
        }
    }

    async function handleUpdateTask(e) {
        e.preventDefault()
        const updatedTask = {...taskToUpdate,
            workingTimeToFinish: workingTime,
            finishDate: new Date().toISOString().slice(0, 10),
            isFinal: true
        }
        try {
            await updateTask(updatedTask);
            await fetchData()
            setIsFinishedModal(false)
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <MDBContainer className="py-5" >
            {isModal && (
                <Modal
                    title={'Add task'}
                    isModal={isModal} // isVisible
                    setIsModal={setIsModal}
                    handleTask={handleAddTask}
                    formData={formData}
                    setFormData={setFormData}
                    setWorkingTime={setWorkingTime}
                    isAddModal={true}
                />
            )}
            {isFinishedModal && (
                <Modal
                    title={'Finish task'}
                    isModal={isFinishedModal}
                    setIsModal={setIsFinishedModal}
                    handleTask={handleUpdateTask}
                    formData={formData}
                    setFormData={setFormData}
                    setWorkingTime={setWorkingTime}
                    isAddModal={false}
                />
            )}
            <UserInfo username={'Dragos Vasile'} />
            <MDBRow className="d-flex justify-content-center align-items-center h-100">
                <Title title={'My ToDo List'}/>
                <MDBCol className="mx-auto">
                    <MDBCard id="list1" style={{ borderRadius: ".75rem", backgroundColor: "#eff1f2"}}>
                        <MDBCardBody className="py-4 px-4 px-md-5">
                            <FilterButton title={title} icon={icon} handleSortToggle={handleSortToggle}/>
                            {tasks.map((task) => {
                                return(
                                    <Task
                                        task={task}
                                        handleDeleteTask={handleDeleteTask}
                                        setIsFinishedModal={setIsFinishedModal}
                                        setTaskToUpdate={setTaskToUpdate}
                                        setWorkingTime={setWorkingTime}
                                        key={task.id}
                                    />
                                )
                            })}
                        </MDBCardBody>
                        <hr className="my-4" />
                        <AddTaskButton setIsModal={setIsModal} emptyForm={emptyForm} setFormData={setFormData}/>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

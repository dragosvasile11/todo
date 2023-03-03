import React from 'react';
import {MDBCheckbox, MDBListGroup, MDBListGroupItem} from "mdb-react-ui-kit";
import TaskName from "./TaskName.jsx";
import TaskDeadline from "./TaskDeadline.jsx";
import TaskActions from "./TaskActions.jsx";

const Task = ({task, handleDeleteTask, setIsFinishedModal, setTaskToUpdate, setWorkingTime}) => {

    function handleChange(e) {
        e.preventDefault()
        setIsFinishedModal(true)
        setWorkingTime(null)
        setTaskToUpdate(task)
    }

    return (
        <MDBListGroup horizontal className="rounded-0 bg-transparent" key={task.id}>
            <MDBListGroupItem className="d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
                <MDBCheckbox
                    name="flexCheck"
                    id="flexCheckChecked"
                    checked={task.isFinal}
                    onChange={(e) => task.isFinal ? null : handleChange(e)}
                />
            </MDBListGroupItem>
            <TaskName task={task} />
            <TaskDeadline task={task} />
            <TaskActions task={task} handleDeleteTask={handleDeleteTask} />
        </MDBListGroup>
    );
};

export default Task;

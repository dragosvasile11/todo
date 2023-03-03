import React from 'react';
import {MDBListGroup} from "mdb-react-ui-kit";
import TaskName from "./TaskName.jsx";
import TaskDeadline from "./TaskDeadline.jsx";
import TaskActions from "./TaskActions.jsx";
import TaskFinish from "./TaskFinish.jsx";

const Task = ({task, handleDeleteTask, setIsFinishedModal, setTaskToUpdate, setWorkingTime}) => {

    function handleChange(e) {
        e.preventDefault()
        setIsFinishedModal(true)
        setWorkingTime(null)
        setTaskToUpdate(task)
    }

    return (
        <MDBListGroup horizontal className="rounded-0 bg-transparent" key={task.id}>
            <TaskFinish task={task} handleChange={handleChange}/>
            <TaskName task={task} />
            <TaskDeadline task={task} />
            <TaskActions task={task} handleDeleteTask={handleDeleteTask} />
        </MDBListGroup>
    );
};

export default Task;

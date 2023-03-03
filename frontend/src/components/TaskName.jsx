import React from 'react';
import {MDBListGroupItem} from "mdb-react-ui-kit";

const TaskName = ({task}) => {
    return (
        <MDBListGroupItem className="px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
            {" "}
            <p className="lead fw-normal mb-0">
                {task.isFinal ? <s>{task.name}</s> : task.name}
            </p>
        </MDBListGroupItem>
    );
};

export default TaskName;

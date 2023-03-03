import React from 'react';
import {MDBIcon, MDBListGroupItem, MDBTooltip} from "mdb-react-ui-kit";

const TaskDeadline = ({task}) => {
    return (
        <MDBListGroupItem className="px-3 py-1 d-flex align-items-center border-0 bg-transparent">
            <div className="py-2 px-3 me-2 border rounded-3 d-flex align-items-center bg-light">
                <p className="small mb-0">
                    <MDBTooltip tag="a" title="Due on date">
                        <MDBIcon
                            fas
                            icon="hourglass-half"
                            color={Math.floor((new Date(task.deadlineDate) - new Date()) / (1000 * 3600 * 24)) === 1 ? "warning" : "info"}
                            className="me-2"
                        />
                    </MDBTooltip>
                    {task.deadlineDate}
                </p>
            </div>
        </MDBListGroupItem>
    );
};

export default TaskDeadline;

import React from 'react';
import {MDBIcon, MDBListGroupItem, MDBTooltip} from "mdb-react-ui-kit";

const TaskActions = ({task, handleDeleteTask}) => {
    return (
        <MDBListGroupItem className="ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent" style={{ width: "80px" }} >
            <div className="d-flex flex-row justify-content-end mb-1">
                <MDBTooltip tag="a" title={task.type}>
                    <MDBIcon
                        fas
                        icon="clipboard-list"
                        className="me-3"
                        color={task.type === "Home" ? 'info' : task.type === "Hobby" ? 'warning' : 'danger'}
                    />
                </MDBTooltip>
                <MDBTooltip tag="a" wrapperProps={{ href: "#!" }} title="Delete task">
                    <MDBIcon onClick={() => handleDeleteTask(task.id)} fas icon="trash-alt" color="danger" />
                </MDBTooltip>
            </div>
            <div className="text-end text-muted">
                <MDBTooltip tag="a" title="Estimated time / Days until deadline">
                    <p className="d-flex align-items-center small text-muted mb-0 ">
                        <MDBIcon fas icon="info-circle" className="me-2"/>
                        <span>{`${task.estimatedTime}/${Math.floor((new Date(task.deadlineDate) - new Date()) / (1000 * 3600 * 24))}`}</span>
                    </p>
                </MDBTooltip>
            </div>
        </MDBListGroupItem>
    );
};

export default TaskActions;

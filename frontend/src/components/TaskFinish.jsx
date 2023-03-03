import React from 'react';
import {MDBCheckbox, MDBListGroupItem} from "mdb-react-ui-kit";

const TaskFinish = ({task, handleChange}) => {
    return (
        <MDBListGroupItem className="d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
            <MDBCheckbox
                name="flexCheck"
                id="flexCheckChecked"
                checked={task.isFinal}
                onChange={(e) => task.isFinal ? null : handleChange(e)}
            />
        </MDBListGroupItem>
    );
};

export default TaskFinish;

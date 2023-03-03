import React from 'react';
import {MDBBtn} from "mdb-react-ui-kit";

const AddTaskButton = ({setIsModal, emptyForm, setFormData}) => {
    return (
        <div className="pb-2 d-flex justify-content-end" >
            <div className="d-flex flex-row align-items-center mx-4 mb-3">
                <div>
                    <MDBBtn onClick={() => {
                        setIsModal(true);
                        setFormData(emptyForm);
                    }}>Add task</MDBBtn>
                </div>
            </div>
        </div>
    );
};

export default AddTaskButton;

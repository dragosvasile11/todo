import {useEffect} from "react";
import {
    MDBBtn,
    MDBInput,
    MDBModal,
    MDBModalBody,
    MDBModalFooter,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalDialog,
    MDBModalContent
} from 'mdb-react-ui-kit';

const Modal = ({ title, isModal, setIsModal, handleTask, formData, setFormData, setWorkingTime, isAddModal }) => {

    const timeSelect = isAddModal ? "estimatedTime" : "workingTime";
    const timeLabel = isAddModal ? "Estimated Time" : "Working Time";

    function onChangeInput(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onKeyPress = (event) => {
        const keyCode = event.which ? event.which : event.keyCode;
        const isValidKey =
            (keyCode >= 48 && keyCode <= 57) ||
            (keyCode >= 96 && keyCode <= 105);
        if (!isValidKey) {
            event.preventDefault();
        }
    };

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (e.target.classList.contains('modal')) setIsModal(false);
        };
        window.addEventListener('click', handleOutsideClick);
        return () => {
            window.removeEventListener('click', handleOutsideClick);
        };
    }, [isModal, setIsModal]);

    return (
        <MDBModal show={isModal}  tabIndex='-1' backdrop='static'>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>{title}</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={() => setIsModal(false)}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>
                        <form>
                            {isAddModal && (
                                <>
                                    <div className='mb-3'>
                                        <MDBInput
                                            name="name"
                                            onChange={onChangeInput}
                                            labelClass='col-form-label'
                                            label='Name'
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <select className="form-select" name="type" onChange={onChangeInput}>
                                            <option value="" disabled selected hidden>Select type</option>
                                            <option value="HOME">HOME</option>
                                            <option value="HOBBY">HOBBY</option>
                                            <option value="WORK">WORK</option>
                                        </select>
                                    </div>
                                    <div className='mb-3'>
                                        <MDBInput
                                            name="deadlineDate"
                                            onChange={onChangeInput}
                                            labelClass='col-form-label'
                                            label='Deadline Date'
                                            type="date"
                                            min={new Date().toISOString().slice(0, 10)}
                                        />
                                    </div>
                                </>
                            )}
                            <div className='mb-3'>
                                <MDBInput
                                    name={timeSelect}
                                    onChange={(e) => isAddModal ? onChangeInput(e) : setWorkingTime(e.target.value)}
                                    labelClass='col-form-label'
                                    label={timeLabel}
                                    type="number"
                                    min="0"
                                    onKeyUp={onKeyPress}
                                    autoComplete="off"
                                />
                            </div>
                        </form>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color='secondary' onClick={() => setIsModal(false)}>Close</MDBBtn>
                        <MDBBtn onClick={(e) => isAddModal ? handleTask(formData) : handleTask(e)}>Save changes</MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
};

export default Modal;

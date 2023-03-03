import React from 'react';
import {MDBIcon} from "mdb-react-ui-kit";

const UserInfo = ({username}) => {
    return (
        <p className="h5 text-end mb-10 pb-3 text-primary">
            <MDBIcon fas icon="user-circle" className="me-1" />
            <b>{username}</b>
        </p>
    );
};

export default UserInfo;

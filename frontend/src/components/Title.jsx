import React from 'react';
import {MDBIcon} from "mdb-react-ui-kit";

const Title = ({title}) => {
    return (
        <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
            <MDBIcon fas icon="check-square" className="me-1" />
            <b>{title}</b>
        </p>
    );
};

export default Title;

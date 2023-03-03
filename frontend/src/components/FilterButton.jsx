import React from 'react';
import {MDBIcon, MDBTooltip} from "mdb-react-ui-kit";

const FilterButton = ({title, icon, handleSortToggle}) => {
    return (
        <div className="d-flex justify-content-end align-items-center mb-4 pt-2 pb-3">
            <p className="small mb-0 me-2 text-muted">Filter</p>
            <MDBTooltip tag="a" title={title}>
                <MDBIcon
                    fas
                    icon={icon}
                    className="ms-2"
                    style={{ color: "#23af89", cursor: "pointer"}}
                    onClick={handleSortToggle}
                />
            </MDBTooltip>
        </div>
    );
};

export default FilterButton;

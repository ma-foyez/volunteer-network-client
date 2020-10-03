import React, { useEffect, useState } from 'react';
import './VolunteerManager.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import moment from 'moment';

const VolunteerManager = (props) => {
    const { name, email, eventDate, eventTitle, photo } = props.data;
    return (
        <>
            <tr>
                <td>{name}</td>
                <td>{email}</td>
                <td>{eventTitle}</td>
                <td>{moment(eventDate.toString()).format("dd,DD/MM/YYYY")}</td>
                <td>
                    <button className="btn btn-primary text-center mr-3"> <FontAwesomeIcon icon={faEdit} /></button>

                   <button className="btn btn-danger text-center"> <FontAwesomeIcon icon={faTrashAlt} /></button>
                </td>
            </tr>

        </>
    );
};

export default VolunteerManager;
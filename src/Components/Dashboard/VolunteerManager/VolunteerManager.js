import React, { useEffect, useState } from 'react';
import './VolunteerManager.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Button, Modal } from 'react-bootstrap';
import moment from 'moment';
import logo from '../../../all-image/logos/Group 1329.png'

const VolunteerManager = (props) => {
    const { name, email, eventDate, eventTitle, _id } = props.data;

    const [showDelete, setShowDelete] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    const handleDeleteHide = () => setShowDelete(false);
    const handleDeleteShow = () => setShowDelete(true);

    const handleUpdateHide = () => setShowUpdate(false);
    const handleUpdateShow = () => setShowUpdate(true);

    const handleDeleteVolunteer = () => {
        console.log(_id)
        fetch('http://localhost:5000/deleteVolunteer?id=' + _id, {
            method: 'DELETE',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setShowDelete(false);
                }
            })
    }
    return (
        <>
            <tr>
                <td>{name}</td>
                <td>{email}</td>
                <td>{eventTitle}</td>
                <td>{moment(eventDate.toString()).format("dd,DD/MM/YYYY")}</td>
                <td>
                    <button className="btn btn-primary text-center mr-3" onClick={handleUpdateShow}> <FontAwesomeIcon icon={faEdit} /></button>

                    <button className="btn btn-danger text-center" onClick={handleDeleteShow}> <FontAwesomeIcon icon={faTrashAlt} /></button>
                </td>
            </tr>

            <Modal show={showUpdate} onHide={handleUpdateHide}>
                <Modal.Header closeButton>
                    <Modal.Title className="modal-logo"> <img src={logo} alt="" /> </Modal.Title>
                </Modal.Header>
                <Modal.Body> <h3 className="text-primary text-center">Are You Sure To Update details?</h3> </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary"> Update </Button>
                    <Button variant="secondary" onClick={handleUpdateHide}> Cancel </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDelete} onHide={handleDeleteHide}>
                <Modal.Header closeButton>
                    <Modal.Title className="modal-logo"> <img src={logo} alt="" /> </Modal.Title>
                </Modal.Header>
                <Modal.Body> <h3 className="text-danger text-center">Are You Sure To Delete?</h3> </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleDeleteVolunteer}> Confirm Delete </Button>
                    <Button variant="secondary" onClick={handleDeleteHide}> Cancel </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
};

export default VolunteerManager;
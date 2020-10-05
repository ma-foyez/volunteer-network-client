import React, { useEffect, useState } from 'react';
import './VolunteerManager.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Button, Modal } from 'react-bootstrap';
import moment from 'moment';
import logo from '../../../all-image/logos/Group 1329.png'
import { useForm } from "react-hook-form";

const VolunteerManager = (props) => {
    const { name, email, eventDate, eventTitle, _id } = props.data;

    const [showDelete, setShowDelete] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    const handleDeleteHide = () => setShowDelete(false);
    const handleDeleteShow = () => setShowDelete(true);

    const handleUpdateHide = () => setShowUpdate(false);
    const handleUpdateShow = () => setShowUpdate(true);

    // handle delete volunteer information

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
                    window.location.reload();
                }
            })
    }
    // handle update volunteer data 
    const updateVolunteerInfo = () => {
        const name = document.getElementById('VolunteerName').value;
        const email = document.getElementById('VolunteerEmail').value;
        const eventTitle = document.getElementById('event').value;
        const eventDate = document.getElementById('date').value;

        const volunteerInfo = { name, email, eventTitle, eventDate }

        fetch('http://localhost:5000/updateVolunteerInfo?id=' + _id, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(volunteerInfo)
        })
            .then(res => res.json())
            .then(data => {
                setShowUpdate(false)
                window.location.reload();
            })
    }
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);
    return (
        <>
            <tr>
                <td>{name}</td>
                <td>{email}</td>
                <td>{eventTitle}</td>
                <td>{moment(eventDate.toString()).format("DD/MM/YYYY")}</td>
                <td>
                    <button className="btn btn-primary text-center mr-3" onClick={handleUpdateShow}> <FontAwesomeIcon icon={faEdit} /></button>

                    <button className="btn btn-danger text-center" onClick={handleDeleteShow}> <FontAwesomeIcon icon={faTrashAlt} /></button>
                </td>
            </tr>

            <Modal show={showUpdate} onHide={handleUpdateHide}>
                <Modal.Header closeButton>
                    <Modal.Title className="modal-logo"> <img src={logo} alt="" /> </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Modal.Body>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input name="example" className="form-control mb-2" id="VolunteerName" defaultValue={name} ref={register} />
                            <input name="example" type="email" className="form-control mb-2" id="VolunteerEmail" defaultValue={email} ref={register} />
                            <input name="example" type="text" className="form-control mb-2" id="event" defaultValue={eventTitle} ref={register} />
                            <input name="example" type="date" className="form-control mb-2" id="date" defaultValue={eventDate} ref={register} />

                        </form>
                    </Modal.Body>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={updateVolunteerInfo}> Update </Button>
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
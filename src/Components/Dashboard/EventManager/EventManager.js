import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment';
import { Button, Modal } from 'react-bootstrap';
import logo from '../../../all-image/logos/Group 1329.png'
import './EventManager.css'
import { useForm } from "react-hook-form";

const EventManager = (props) => {
    const { eventTitle, eventDate, description, _id } = props.event;
    const [showDelete, setShowDelete] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    const handleDeleteHide = () => setShowDelete(false);
    const handleDeleteShow = () => setShowDelete(true);

    // handle load single event for update
    const handleUpdateHide = () => setShowUpdate(false);

    const handleUpdateShow = () => {
        setShowUpdate(true)
    }

    //handle delete event
    const handleDeleteEvent = (e) => {
        console.log(_id)
        fetch('https://stark-gorge-33129.herokuapp.com/deleteEvent?id=' + _id, {
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
                    props.filterEvent(_id)
                }
            })
    }

    // handle update event
    const handleUpdateEvent = () => {
        const eventTitle = document.getElementById('event').value;
        const eventDate = document.getElementById('date').value;
        const description = document.getElementById('des').value;

        const updateEventInfo = { eventTitle, eventDate, description }

        fetch('https://stark-gorge-33129.herokuapp.com/updateEvent?id=' + _id, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updateEventInfo)
        })
            .then(res => res.json())
            .then(data => {
                setShowUpdate(false)
                window.location.reload();   
            })
    }
    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);
    return (
        <>
            <tr>
                <td>{eventTitle}</td>
                <td>{moment(eventDate.toString()).format("DD/MM/YYYY")}</td>
                <td> <small>{description}</small> </td>
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input name="example" className="form-control mb-2" id="event" defaultValue={eventTitle} ref={register} />
                        <input name="example" type="date" className="form-control mb-2"id="date" defaultValue={eventDate} ref={register} />
                        <textarea name="example" type="date" className="form-control mb-2" id="des" defaultValue={description} ref={register}></textarea>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleUpdateEvent}> Update </Button>
                    <Button variant="secondary" onClick={handleUpdateHide}> Cancel </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDelete} onHide={handleDeleteHide}>
                <Modal.Header closeButton>
                    <Modal.Title className="modal-logo"> <img src={logo} alt="" /> </Modal.Title>
                </Modal.Header>
                <Modal.Body> <h3 className="text-danger text-center">Are You Sure To Delete?</h3> </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={()=> handleDeleteEvent()}> Confirm Delete </Button>
                    <Button variant="secondary" onClick={handleDeleteHide}> Cancel </Button>
                </Modal.Footer>
            </Modal>


        </>
    );
};

export default EventManager;
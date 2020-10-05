import React, { useState } from 'react';
import moment from 'moment';
import './LoadVolunteerActivities.css'
import { Button, Modal } from 'react-bootstrap';
import logo from '../../all-image/logos/Group 1329.png'

const LoadVolunteerActivities = (props) => {
    const { eventTitle, eventBanner, eventDate, _id } = props.activities;
    const [showDelete, setShowDelete] = useState(false);


    const handleDeleteActivities = () => {
        fetch('https://stark-gorge-33129.herokuapp.com/deleteVolunteer?id=' + _id, {
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
                    props.filterActivities(_id)
                }
            })
    }


    const handleDeleteHide = () => setShowDelete(false);
    const handleDeleteShow = () => setShowDelete(true);
    return (
        <>
            <div className="col-md-6" id="event-delete">
                <div className="shadow p-4 mb-5 bg-white rounded">
                    <div className="row">
                        <div className="col-5">
                            <img src={eventBanner} className="img-fluid" alt="" />
                        </div>
                        <div className="col-6 pt-3">
                            <h4 className="event-title">{eventTitle}</h4>
                            <h6 className="event-date">{moment(eventDate.toString()).format("MMMM Do, YYYY")}</h6>
                            <button className="btn btn-secondary cancel-btn float-right mt-5" onClick={handleDeleteShow}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showDelete} onHide={handleDeleteHide}>
                <Modal.Header closeButton>
                    <Modal.Title className="modal-logo"> <img src={logo} alt="" /> </Modal.Title>
                </Modal.Header>
                <Modal.Body> <h3 className="text-danger text-center">Are You Sure To Delete?</h3> </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => handleDeleteActivities()}> Confirm Delete </Button>
                    <Button variant="secondary" onClick={handleDeleteHide}> Cancel </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
};

export default LoadVolunteerActivities;
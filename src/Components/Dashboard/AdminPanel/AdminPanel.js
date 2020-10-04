import React, { useContext, useEffect, useState } from 'react';
import { Accordion, Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarPlus, faChartLine, faCloudMeatball, faCloudUploadAlt, faPlusCircle, faUsers } from '@fortawesome/free-solid-svg-icons'
import './AdminPanel.css'
import VolunteerManager from '../VolunteerManager/VolunteerManager';
import EventManager from '../EventManager/EventManager';
import AddNewEvent from '../AddNewEvent/AddNewEvent';

const AdminPanel = () => {
    // load all volunteer data
    const [volunteer, setVolunteer] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/AllVolunteer')
            .then(res => res.json())
            .then(data => setVolunteer(data))
    }, [])

    // load all event data in dashboard
    const [event, setEvent] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/AllEvent')
            .then(res => res.json())
            .then(data => setEvent(data))
    }, [])
    return (
        <>
            <Accordion defaultActiveKey="0">
                <div className="d-flex" id="wrapper">
                    <div className="bg-light border-right" id="sidebar-wrapper">
                        <div className="list-group list-group-flush text-left">
                            <h4 className="text-center mt-4 mb-3 font-weight-bold" style={{ color: '#FF7044' }}><FontAwesomeIcon icon={faChartLine} /> Dashboard </h4>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0"><button className="items"><FontAwesomeIcon icon={faUsers} /> Valunteers Manager</button></Accordion.Toggle>
                            <Accordion.Toggle as={Button} variant="link" eventKey="1"><button className="items"><FontAwesomeIcon icon={faCalendarPlus} /> Events Manager</button></Accordion.Toggle>
                            <Accordion.Toggle as={Button} variant="link" eventKey="2"><button className="items"><FontAwesomeIcon icon={faPlusCircle} /> Add Event</button></Accordion.Toggle>
                        </div>
                    </div>

                    <div className="toggle-data">
                        <div id="page-content-wrapper">
                            <div className="container-fluid">
                                <Accordion.Collapse eventKey="0">
                                    <div className="volunteer-manager w-100">
                                        <h2 className="pt-3 m-2 add-event">All Volunteers List </h2>
                                        <h3 className="m-2 length">Total Volunteers - {volunteer.length}</h3>
                                        <table class="table table-hover border border-primary text-center w-75 mt-3" border="1">
                                            <thead>
                                                <tr class="table-primary">
                                                    <th scope="col">Volunteer Name</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Event</th>
                                                    <th scope="col">Event Date</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody id="tbody">
                                                {
                                                    volunteer.map(data => <VolunteerManager data={data}></VolunteerManager>)
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </Accordion.Collapse>
                            </div>
                        </div>
                        <div id="page-content-wrapper">
                            <div className="container-fluid">
                                <Accordion.Collapse eventKey="1">
                                    <div className="event-manager">
                                        <h2 className="pt-3 m-3 add-event">All Events</h2>
                                        <h3 className="m-2 length">Total Events - {event.length}</h3>
                                        <table class="table table-hover border border-primary text-center w-75" border="1">
                                            <thead>
                                                <tr class="table-primary">
                                                    <th scope="col">Event Title</th>
                                                    <th scope="col">Event Date</th>
                                                    <th scope="col">Description</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody id="tbody">
                                                {
                                                    event.map(data => <EventManager event={data}></EventManager>)
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </Accordion.Collapse>
                            </div>
                        </div>
                        <div id="page-content-wrapper">
                            <div className="container-fluid m-2">
                                <Accordion.Collapse eventKey="2">
                                    <div className="event">
                                        <h2 className="pt-3 m-3 add-event">Add New Event</h2>
                                        <AddNewEvent></AddNewEvent>
                                    </div>
                                </Accordion.Collapse>
                            </div>
                        </div>
                    </div>
                </div >
            </Accordion>
        </>
    );
};

export default AdminPanel;


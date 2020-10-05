import React, { useEffect, useState } from 'react';
import { Accordion, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarPlus, faChartLine, faPlusCircle, faUsers } from '@fortawesome/free-solid-svg-icons'
import './AdminPanel.css'
import VolunteerManager from '../VolunteerManager/VolunteerManager';
import EventManager from '../EventManager/EventManager';
import AddNewEvent from '../AddNewEvent/AddNewEvent';

const AdminPanel = () => {

    // load all volunteer data
    const [volunteer, setVolunteer] = useState([]);

    useEffect(() => {
        fetch('https://stark-gorge-33129.herokuapp.com/AllVolunteer')
            .then(res => res.json())
            .then(data => setVolunteer(data))
    }, [volunteer])

    // load all event data in dashboard
    const [event, setEvent] = useState([])
    useEffect(() => {
        fetch('https://stark-gorge-33129.herokuapp.com/AllEvent')
            .then(res => res.json())
            .then(data => setEvent(data))
    }, [event]);
    // volunteer info
    const filterVolunteer = (id) => {
        const newVolunteer = volunteer.filter(volunteer => volunteer._id !== id);
        setVolunteer(newVolunteer);
    }
    // filter events 
    const filterEvent = (id) => {
        const newEvent = event.filter(event => event._id !== id);
        setEvent(newEvent);
    }
    return (
        <>
            <Accordion defaultActiveKey="0">
                <div id="wrapper">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="bg-light border-right" id="sidebar-wrapper">
                                <div className="list-group list-group-flush text-left">
                                    <h4 className="text-center mt-4 mb-3 font-weight-bold" style={{ color: '#FF7044' }}><FontAwesomeIcon icon={faChartLine} /> Dashboard </h4>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0"><button className="items"><FontAwesomeIcon icon={faUsers} /> Valunteers Manager</button></Accordion.Toggle>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="1"><button className="items"><FontAwesomeIcon icon={faCalendarPlus} /> Events Manager</button></Accordion.Toggle>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="2"><button className="items"><FontAwesomeIcon icon={faPlusCircle} /> Add Event</button></Accordion.Toggle>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="mr-5">
                                <Accordion.Collapse eventKey="0">
                                    <div className="volunteer-manager w-100">
                                        <h2 className="pt-3 m-2 add-event">All Volunteers List </h2>
                                        <h3 className="m-2 length">Total Volunteers - {volunteer.length}</h3>
                                        <table class="table table-hover border border-primary text-center m-3 mt-3" border="1">
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
                                                    volunteer.map(data => <VolunteerManager data={data} filterVolunteer={filterVolunteer}></VolunteerManager>)
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </Accordion.Collapse>
                                <Accordion.Collapse eventKey="1">
                                    <div className="event-manager">
                                        <h2 className="pt-3 m-3 add-event">All Events</h2>
                                        <h3 className="m-2 length">Total Events - {event.length}</h3>
                                        <table class="table table-hover border border-primary text-center" border="1">
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
                                                    event.map(data => <EventManager event={data} filterEvent={filterEvent}></EventManager>)
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </Accordion.Collapse>
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


import React, { useContext, useEffect, useState } from 'react';
import { Accordion, Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarPlus, faChartLine, faCloudMeatball, faCloudUploadAlt, faPlusCircle, faUsers } from '@fortawesome/free-solid-svg-icons'
import './AdminPanel.css'
import VolunteerManager from '../VolunteerManager/VolunteerManager';

const AdminPanel = () => {
    // handle add event
    const handleAddEvent = () => {
        const eventTitle = document.getElementById('eventTitle').value;
        const description = document.getElementById('description').value;
        const eventDate = document.getElementById('eventDate').value;
        const eventBanner = document.getElementById('eventBanner').value;
        const eventBannerURL = document.getElementById('eventBannerURL').value;

        const evnetInfo = { eventTitle, description, eventDate, eventBannerURL }
        if (eventTitle === '' || description === '' || eventDate === '' || eventTitle === '') {
            alert('Please insert a valid event details')
        } else {
            fetch('http://localhost:5000/addEvent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(evnetInfo)
            })
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        alert("New Event added successfully");
                    }
                })
        }


        document.getElementById('eventTitle').value = '';
        document.getElementById('description').value = '';
        document.getElementById('eventDate').value = '';
        document.getElementById('eventBanner').value = '';
        document.getElementById('eventBannerURL').value = '';

    }
    // load all volunteer data
    const [volunteer, setVolunteer] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/AllVolunteer')
            .then(res => res.json())
            .then(data => setVolunteer(data))
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
                                        <h2 className="pt-3 m-3 add-event">All Volunteers List</h2>
                                        <table class="table table-hover border border-primary text-center w-75" border="1">
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
                                    <h2 className="pt-3 m-3 add-event">Events Manager</h2>
                                </Accordion.Collapse>
                            </div>
                        </div>
                        <div id="page-content-wrapper">
                            <div className="container-fluid m-2">
                                <Accordion.Collapse eventKey="2">
                                    <div className="event">
                                        <h2 className="pt-3 m-3 add-event">Add New Event</h2>
                                        <form action="" className="mt-5">
                                            <div className="row event-form shadow p-3 mb-5 bg-white rounded m-3 w-75">
                                                <div className="col-md-6">
                                                    <div class="form-group">
                                                        <label for="exampleFormControlInput1">Event Title</label>
                                                        <input type="text" class="form-control" id="eventTitle" placeholder="Event Title" />
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="exampleFormControlInput1">Description</label>
                                                        <textarea class="form-control" id="description" placeholder="Description"></textarea>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="exampleFormControlInput1">Event Date</label>
                                                        <input type="date" class="form-control" id="eventDate" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div class="from-group">
                                                        <label for="exampleFormControlInput1">Banner</label>
                                                        <div class="custom-file">
                                                            <input type="file" class="custom-file-input" id="eventBanner" aria-describedby="inputGroupFileAddon01" />
                                                            <label class="custom-file-label" for="inputGroupFile01"><FontAwesomeIcon icon={faCloudUploadAlt} /> Choose Event Photos</label></div>
                                                    </div> <br />
                                                    <div className="text-center">
                                                        <button disabled className="btn or-btn">OR</button>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="exampleFormControlInput1">Banner URL</label>
                                                        <input type="text" class="form-control" id="eventBannerURL" placeholder="Host your image in server and input image url" />
                                                    </div>
                                                    <input type="button" className="btn btn-primary float-right" value="Submit" onClick={() => handleAddEvent()} />
                                                </div>
                                            </div>
                                        </form>
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


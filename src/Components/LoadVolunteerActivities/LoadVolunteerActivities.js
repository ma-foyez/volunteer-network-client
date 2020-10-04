import React, { useEffect } from 'react';
import moment from 'moment';
import './LoadVolunteerActivities.css'
const LoadVolunteerActivities = (props) => {
    const { eventTitle, eventBanner, eventDate, _id } = props.activities;


    const handleDeleteActivities = (event) => {
        console.log(_id)
        fetch('http://localhost:5000/delete?id=' + _id, {
            method: 'DELETE',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    alert('Delected one event');
                }
            })
    }
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
                            <button className="btn btn-secondary cancel-btn float-right mt-5" onClick={handleDeleteActivities} id="event-delete">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default LoadVolunteerActivities;
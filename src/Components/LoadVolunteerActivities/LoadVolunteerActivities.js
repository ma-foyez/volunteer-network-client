import React, { useEffect } from 'react';
import moment from 'moment';
import './LoadVolunteerActivities.css'
const LoadVolunteerActivities = (props) => {
    const { eventTitle, eventBanner, eventDate, _id } = props.activities;


    const handleDeleteActivities = (id) => {
        fetch(`/delete/${id}`, {
            method: 'DELETE',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                alert('deleted')
            })
    }
    return (
        <>
            <div className="col-md-6">
                <div className="shadow p-4 mb-5 bg-white rounded">
                    <div className="row">
                        <div className="col-5">
                            <img src={eventBanner} className="img-fluid" alt="" />
                        </div>
                        <div className="col-6 pt-3">
                            <h4 className="event-title">{eventTitle}</h4>
                            <h6 className="event-date">{moment(eventDate.toString()).format("MMMM Do, YYYY")}</h6>
                            <button className="btn btn-secondary cancel-btn float-right mt-5" onClick={handleDeleteActivities()}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default LoadVolunteerActivities;
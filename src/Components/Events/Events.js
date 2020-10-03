import React from 'react';
import { Link } from 'react-router-dom';
import './Events.css'
const Events = ({ event }) => {
    console.log(event._id)
    return (
        <>
            <div className="col-md-3 mb-3 event-card">
                <Link to={`/registerVolunteer/${event._id}`}>
                    <img src={event.eventBannerURL} className="img-fluid w-100" alt="" />
                    <h4 className="eventTitle">{event.eventTitle}</h4>
                </Link>
            </div>

        </>
    );
};

export default Events;
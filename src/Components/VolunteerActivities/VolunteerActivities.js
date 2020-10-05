import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../App';
import LoadVolunteerActivities from '../LoadVolunteerActivities/LoadVolunteerActivities';
import './VolunteerActivities.css'
const VolunteerActivities = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);

    const [volunteerActivities, setVolunteerActivies] = useState([])
    useEffect(() => {
        fetch('https://stark-gorge-33129.herokuapp.com/volunteerActivities?email=' + loggedInUser.email)
            .then(res => res.json())
            .then(data => setVolunteerActivies(data))
    }, [])

    // filter current activities
    const filterActivities = (id)=>{
        const newVolunteer = volunteerActivities.filter(volunteer => volunteer._id !== id);
        setVolunteerActivies(newVolunteer);
    }

    return (
        <>
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-5 text-center shadow p-3 mb-5 bg-white rounded m-3">
                        <img src={loggedInUser.photo} className="img-fluid w-25 user-profile img-thumbnail" alt="user profile" />
                        <h4 className="pt-2">{loggedInUser.name}</h4>
                        <h6>{loggedInUser.email}</h6>
                    </div>
                </div>
                <h2 className="text-center mb-3 activity">
                    {
                        volunteerActivities.length > 0 ? <span>Your Current Activities - {volunteerActivities.length}</span> : 'You have not yet joined any programs.'
                    }
                </h2>
                <div className="row mt-5">
                    {
                        volunteerActivities.map(activities => <LoadVolunteerActivities activities={activities} filterActivities={filterActivities}></LoadVolunteerActivities>)
                    }
                </div>
            </div>
        </>
    );
};

export default VolunteerActivities;
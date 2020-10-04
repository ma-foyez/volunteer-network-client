import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../App';
import LoadVolunteerActivities from '../LoadVolunteerActivities/LoadVolunteerActivities';
import './VolunteerActivities.css'
const VolunteerActivities = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);

    const [volunteerActivities, setVolunteerActivies] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/volunteerActivities?email='+loggedInUser.email)
            .then(res => res.json())
            .then(data => setVolunteerActivies(data))
    }, [])
   
    return (
        <>
            <div className="container mt-4">
                <div className="row">
                    {
                        volunteerActivities.map(activities => <LoadVolunteerActivities activities={activities}></LoadVolunteerActivities>)
                    }
                </div>
            </div>
        </>
    );
};

export default VolunteerActivities;
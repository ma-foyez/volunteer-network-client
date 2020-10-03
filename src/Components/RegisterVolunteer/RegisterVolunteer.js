import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import logo from '../../all-image/logos/Group 1329.png'
import './RegisterVolunteer.css'
import { userContext } from '../../App';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const RegisterVolunteer = (props) => {
    const classes = useStyles();
    const { volunteerID } = useParams();
    const [singleEvent, setSingleEvent] = useState({})
    useEffect(() => {
        fetch(`http://localhost:5000/singleEvent/${volunteerID}`)
            .then(res => res.json())
            .then(data => setSingleEvent(data));

    }, [volunteerID])

    //logged in user information
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const name = loggedInUser.name;
    const email = loggedInUser.email;

    // post volunteer information into database
    const registerVolunteer = () => {
        const eventBanner = singleEvent.eventBannerURL;
        const eventTitle = document.getElementById('eventTitle').value;
        const eventDate = document.getElementById('eventDate').value;
        const userExperience = document.getElementById('userExperience').value;
        const organize = document.getElementById('organize').value;
        const postUserInfo = { ...loggedInUser, eventTitle, eventBanner, eventDate, userExperience, organize };
        console.log(postUserInfo)
        if (userExperience === '') {
            alert('Please share your feelings with us.')
        } else {
            fetch('http://localhost:5000/registerVolunteer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postUserInfo)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data) {
                        console.log(data);
                        alert("Your Registration has been successfully complate.");
                    }
                })
        }
    }
    return (
        <>
            <div className="event-register">
                <div className="container mt-3">
                    <div className="row justify-content-center">
                        <div className="col-md-5 event text-center m-4 shadow p-4 mb-5 bg-white rounded">
                            <img className="ml-4 mb-3" src={logo} alt="" />
                            <form className={classes.root} noValidate autoComplete="off">
                                <TextField style={{ width: '100%' }} id="name" label="Full Name" value={`${name}`} variant="outlined" />
                                <TextField style={{ width: '100%' }} id="email" label="Email" value={`${email}`} variant="outlined" />
                                <TextField style={{ width: '100%' }} id="eventTitle" label="Event Title" value={`${singleEvent.eventTitle}`} variant="outlined" />
                                <TextField style={{ width: '100%' }} id="eventDate" label="Event Date" value={`${singleEvent.eventDate}`} variant="outlined" />
                                <TextField style={{ width: '100%' }} id="userExperience" label="User Experience" variant="outlined" />
                                <TextField style={{ width: '100%' }} id="organize" label="Organize By" value={`${singleEvent.description}`} variant="outlined" />
                                <input type="button" className="btn btn-primary w-100" value="Registration" onClick={registerVolunteer} />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterVolunteer;
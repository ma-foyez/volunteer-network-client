import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
const AddNewEvent = () => {
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
    return (
        <>
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
                                <label class="custom-file-label" for="inputGroupFile01"><FontAwesomeIcon icon={faCloudUploadAlt} /> Choose Event Banner</label></div>
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

        </>
    );
};

export default AddNewEvent;
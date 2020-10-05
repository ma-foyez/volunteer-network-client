import React, { useEffect, useState } from 'react';
import './TopContainer.css'
import Events from '../Events/Events';
const TopContainer = () => {
    const [event, setEvent] = useState([]);
    // load all events data 
    useEffect(() => {
        fetch('https://stark-gorge-33129.herokuapp.com/AllEvent')
            .then(res => res.json())
            .then(data => setEvent(data));
    }, [])
    return (
        <>
            <section className="top-banner">
                <div className="banner d-md-block d-none"></div>
                <div className="cotnainer mt-5 pt- 5 text-center">
                    <div className="row justify-content-center p-3">
                        <div className="col-md-8 p-3">
                            <h1 className="bannr-title">I grow by helping people in need</h1>
                        </div>
                        <div className="col-md-5 mt-5 m-3">
                            <div className="search">
                                <input type="text" className="border-0 form-control" />
                                <button className="btn search-btn btn-primary">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mt-3">
                    <div className="row">
                        {
                            event.map(event => <Events event={event} key={event._id}></Events>)
                        }
                    </div>
                </div>
            </section>
        </>
    );
};

export default TopContainer;
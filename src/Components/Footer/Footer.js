import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../all-image/logos/Group 1329.png'
import './Footer.css'

const Footer = () => {
    return (
        <footer className="bg-light py-3 mt-5 footer">
            <div className="container pt-5">
                <div className="row footer-top py-2">
                    <div className="col-md-4 mb-5">
                        <img src={logo} className="w-75" alt="Volunteer Network" />
                    </div>
                    <div className="col-md-3">
                        <ul className="list-unstyled">
                            <li>About Online Services</li>
                            <li>Read Our Blog</li>
                            <li>Register to be member</li>
                            <li>Share your location</li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <ul className="list-unstyled">
                            <li>Get Help</li>
                            <li>Read FAQ</li>
                            <li>View All Cities</li>
                            <li>Our Volunteers</li>
                        </ul>
                    </div>

                    <div className="col-md-2">
                        <ul className="list-unstyled">
                            <li>Privacy Policy</li>
                            <li>Terms of use</li>
                            <li>Pricing</li>
                        </ul>
                    </div>
                </div>
                <div className="footer">
                    <small className="text-secondary">Copyright &copy; 2020 || Volunteer Network </small>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
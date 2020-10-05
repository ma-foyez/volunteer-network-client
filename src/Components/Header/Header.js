import React, { useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css'
import logo from '../../all-image/logos/Group 1329.png'
import { userContext } from '../../App';
const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">
                    <Link to="/home">
                        <img className="ml-4" src={logo} alt="" />
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto mr-3">
                        <Nav.Link><Link className="items" to="/home">Home</Link></Nav.Link>
                        <Nav.Link><Link className="items" to="/donation">Donation</Link></Nav.Link>
                        <Nav.Link><Link className="items" to="/events">Events</Link></Nav.Link>
                        <Nav.Link><Link className="items" to="/blog">Blog</Link></Nav.Link>
                        <Nav.Link><Link className="items btn btn-primary" to="/volunteerActivities">Login </Link></Nav.Link>
                        <Nav.Link><Link className="items btn btn-primary" onClick={() => setLoggedInUser({})}>Signout </Link></Nav.Link>
                        <Nav.Link><Link className="items btn btn-dark" to="/admin">Admin</Link></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
};

export default Header;
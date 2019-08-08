import React, { Component } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Notification from "./notification";

class NavBar extends Component {
    render() {
        const {
            transition,
            notification,
            disabled,
            handleLogout,
        } = this.props;

        return <Navbar expand="lg" variant="light" bg="light">
            <Container>
                <Navbar.Brand href='/' className="navbar"> IDEADOCS </Navbar.Brand>
                <div className="notification">
                    <Notification in={transition} notification={notification} />
                </div>
                {disabled ?
                    <Button variant="outline-dark" onClick={handleLogout}>Logout</Button>
                    :
                    <Link to="/login">Log In</Link>}
            </Container>
        </Navbar>
    }
};

export default NavBar
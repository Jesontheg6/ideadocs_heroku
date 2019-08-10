import React from 'react';
import { Navbar } from 'react-bootstrap';

import Navigation from '../navigation';

const NavBar = () => {
    return <Navbar expand="lg" variant="light" bg="light">
        <Navbar.Toggle aria-controls="nav" />
        <Navbar.Brand href='/' className="navbar-brand"> IDEADOCS </Navbar.Brand>
        <Navigation />
    </Navbar>
};

export default NavBar;
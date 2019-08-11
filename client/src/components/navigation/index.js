import React, { useContext } from 'react';
import { Navbar, Nav } from "react-bootstrap";

import * as ROUTES from '../../constants/routes';
import SignOut from '../user/signout';
import { AuthUserContext } from '../../utils/session';

const Navigation = () => {
    const authUser = useContext(AuthUserContext);
    return <>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</>
};

const NavigationAuth = () => (
    <Navbar.Collapse id="nav">
        <Nav className="navigation">
            <Nav.Link href={ROUTES.LANDING}>Home</Nav.Link>
            <Nav.Link href={ROUTES.BOARDS}>Boards</Nav.Link>
            {/* <Nav.Link href={ROUTES.IDEAS}>Ideas</Nav.Link> */}
            <Nav.Link><SignOut /></Nav.Link>
        </Nav>
    </Navbar.Collapse>
);

const NavigationNonAuth = () => (
    <Navbar.Collapse id="nav">
        <Nav className="navigation">
            <Nav.Link href={ROUTES.LANDING}>Home</Nav.Link>
            <Nav.Link href={ROUTES.BOARDS}>Boards</Nav.Link>
            {/* <Nav.Link href={ROUTES.IDEAS}>Ideas</Nav.Link> */}
            <Nav.Link href={ROUTES.SIGN_IN}>Sign In</Nav.Link>
        </Nav>
    </Navbar.Collapse>
);

export default Navigation;
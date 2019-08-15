import React from 'react';
import { Button } from 'react-bootstrap';
import { withFirebase } from '../../utils/firebase';
import toast from "../../constants/toast";
import axios from 'axios';

const SignOut = ({firebase}) => {
    const handleLogout = () => {
        firebase.doSignOut();
        //invalidate token on our backend
        axios.delete('/logout').then(toast('info', 'signed out'));
    };
    return (<Button variant="outline-primary" onClick={handleLogout}>Sign Out</Button>);
}

export default withFirebase(SignOut);
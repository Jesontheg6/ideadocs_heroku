import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { FirebaseContext } from '../../utils/firebase';
import toast from "../../constants/toast";

import { del } from '../utils/headers';

const SignOut = () => {
    const firebase = useContext(FirebaseContext);
    const handleLogout = () => {
        firebase.doSignOut();
        //invalidate token on our backend
        del('/logout').then(toast('info', 'signed out'));
    };
    return (<Button variant="outline-primary" onClick={handleLogout}>Sign Out</Button>);
}

export default SignOut;
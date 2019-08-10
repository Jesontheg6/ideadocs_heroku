import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import {FirebaseContext} from '../../utils/firebase';

const SignOut = (props) => {
    const firebase = useContext(FirebaseContext);
    return (<Button variant="outline-primary" onClick={firebase.doSignOut}>Sign Out</Button>);
}

export default SignOut;
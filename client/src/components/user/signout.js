import React from 'react';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../../utils/firebase';
import toast from '../../constants/toast';
import * as ROUTES from '../../constants/routes';

const SignOut = ({firebase, history}) => {
    const handleLogout = () => firebase.doSignOut().then((res) => toast('info', 'signed out'), history.push(ROUTES.SIGN_IN));
    return <Button variant="outline-primary" onClick={handleLogout}>Sign Out</Button>;
}

export default compose(withRouter,withFirebase)(SignOut);
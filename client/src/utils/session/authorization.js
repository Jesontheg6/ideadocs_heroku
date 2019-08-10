import React, { useContext } from 'react';
// import { withRouter } from 'react-router-dom';

import AuthUserContext from './context';
import { FirebaseContext } from '../firebase';
import * as ROUTES from '../../constants/routes';

const authorize = Component => props => {
    const firebase = useContext(FirebaseContext);
    firebase.auth.onAuthStateChanged(
        authUser => {
            if (!authUser) {
                props.history.push(ROUTES.SIGN_IN);
            }
        });
    return (
        <AuthUserContext.Consumer>
            {authUser => authUser ? <Component {...props} /> : null}
        </AuthUserContext.Consumer>
    );
        };
export default authorize;
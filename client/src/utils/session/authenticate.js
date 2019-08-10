import React, { useContext, useState } from 'react';

import AuthUserContext from './context';
import { FirebaseContext } from '../firebase';

const authenticate = Component => props => {
    const [authUser, setAuthUser] = useState(null);
    const firebase = useContext(FirebaseContext);
    firebase.auth.onAuthStateChanged(
        user => {
            user
                ? setAuthUser(user)
                : setAuthUser(null);
        }
    );
    return (
        <AuthUserContext.Provider value={authUser}>
            <Component {...props} />
        </AuthUserContext.Provider>
    );
};

export default authenticate;
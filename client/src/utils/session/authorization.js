import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import AuthUserContext from './context';
import { withFirebase } from '../firebase';
import * as ROUTES from '../../constants/routes';

const withAuthorization = condition => Component => {
    class Authorize extends React.Component {
        constructor(props) {
            super(props);
            this.listener = null;
        }

        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(
                authUser => {
                    if (!condition(authUser)) {
                        this.props.history.push(ROUTES.SIGN_IN);
                    }
                });
        }
        componentWillUnmount() {
            this.listener();
        }
        render() {
            return (
                <AuthUserContext.Consumer>
                    {authUser => condition(authUser) ? <Component {...this.props} /> : null}
                </AuthUserContext.Consumer>
            );
        }
    }
    return compose(withRouter, withFirebase)(Authorize);

        };
export default withAuthorization;
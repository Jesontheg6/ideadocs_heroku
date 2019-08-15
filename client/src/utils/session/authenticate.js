import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../firebase';

const withAuthentication = Component => {
    class Authenticate extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                authUser: null,
            }
            this.listener = null;
        }
        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(
                user => {
                    user
                        ? this.setState({ authUser: user })
                        : this.setState({ authUser: null });
                }
            );
        }

        componentWillUnmount() {
            this.listener();
        }

        render() {
            return (
                <AuthUserContext.Provider value={this.state.authUser}>
                    <Component {...this.props} />
                </AuthUserContext.Provider>
            )
        };
}
return withFirebase(Authenticate);

};

export default withAuthentication;
import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import toast from '../../constants/toast';

import { withFirebase } from '../../utils/firebase';
import { SignUpLink } from './signup';
import * as ROUTES from '../../constants/routes';

const Login = ({ history, firebase }) => {
    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        firebase
            .doSignInWithEmailAndPassword(email,password)
            .then(response => {
                toast('success', `you are logged in ${response.user.displayName || response.user.email}`);
                history.push(ROUTES.LANDING);
            })
            .catch(error => {
                toast('error', error.message);
            });
    }
    return <Container style={{ width: '50%' }}>
        <Form onSubmit={handleLogin}>
            <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter email address" required />
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" required />
            </Form.Group>
            <Button variant="outline-dark" type="submit">
                Submit
        </Button>
        </Form>
        <SignUpLink />
    </Container>
};

export default withFirebase(Login);
import React from 'react';
import axios from 'axios';
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
            .then(() => {
                // log in user to backend to get token
                axios.post('/login', {
                    email,
                    password,
                }).then(response => {
                    sessionStorage.setItem('token', JSON.stringify(response.headers.authorization));
                    console.log(response.data);
                    toast('success', `you are logged in ${response.data.user.username}`);
                    history.push(ROUTES.LANDING);
                }).catch(error => {
                    toast('error', error.data.message);
                })
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
import React, { useContext } from 'react';
// import axios from 'axios';
import { Button, Container, Form } from 'react-bootstrap';
import toast from '../../constants/toast';

import { FirebaseContext } from '../../utils/firebase';
import { SignUpLink } from './signup';

const Login = ({ setNotification, history }) => {
    const firebase = useContext(FirebaseContext);

    const handleLogin = e => {
        e.preventDefault();
        // axios.post('/login', {
        //     email: e.target.email.value,
        //     password: e.target.password.value,
        // }).then(response => {
        //     sessionStorage.setItem('token', JSON.stringify(response.headers.authorization));
        //     console.log(response.data);
        //     this.props.disableLogin();
        //     this.setState({ redirect: true });
        // }).catch(error => {
        //     console.log(error)
        // })
        firebase
            .doSignInWithEmailAndPassword(e.target.email.value, e.target.password.value)
            .then(() => {
                history.push('/');
                toast('success', 'logged in')
            })
            .catch(error => {
                toast('error', error.message);
                console.log(error.code, error.message);
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

export default Login;
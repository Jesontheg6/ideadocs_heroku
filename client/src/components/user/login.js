import React, { Component } from 'react';
import axios from 'axios';
import { Button, Container, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';


class Login extends Component {
    state = {
        redirect: false,
    };

    componentWillUnmount() {
        this.props.setNotification('Logged in user successfully');
    }

    handleLogin = e => {
        e.preventDefault();
        axios.post('/login', {
            email: e.target.email.value,
            password: e.target.password.value,
        }).then(response => {
            sessionStorage.setItem('token', JSON.stringify(response.headers.authorization));
            console.log(response.data);
            this.props.disableLogin();
            this.setState({ redirect: true });
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/boards' />
        }
        return <Container style={{ width: '50%' }}>
            <Form onSubmit={this.handleLogin}>
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
        </Container>
    }
};

export default Login;
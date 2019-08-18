import React, { useState } from 'react';
import { compose } from 'recompose';
import { Container, Button, Form, Col, InputGroup } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../../utils/firebase';
import * as ROUTES from '../../constants/routes';
import toast from '../../constants/toast';

const SignUp = ({history, firebase}) => {
    const [validated, setValidated] = useState(false);
    const [confirmError, setConfirmError] = useState('');
    let pass = React.createRef();

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        const email = form.elements.email.value;
        const password = form.elements.password.value;
        const username = form.elements.username.value;

        setValidated(true);
        firebase
            .doCreateUserWithEmailAndPassword(email, password)
            .then(authUser => {
                authUser.user.updateProfile({ displayName: username })
                    .then(res => {
                        toast('success', `${username} Signed up.`)
                        history.push(ROUTES.BOARDS)
                    })
                    .catch(error => toast('error', error))
            })
            .catch(error => {
                toast('error', error.message)
            });
    }

    const handleConfirmChange = e => {
        if (pass.current.value !== e.target.value) {
            setConfirmError("Passwords don't match");
        } else {
            setConfirmError('');
        }
    };

    return <Container style={{ width: '60%' }}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group as={Col} md="4" controlId="username">
                <Form.Label>Username</Form.Label>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        aria-describedby="inputGroupPrepend"
                        required
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Please choose a username.
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>
            <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Email" required />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                    Please provide a valid email address.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Row>
                <Form.Group as={Col} md="6" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" required ref={pass} />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid password.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="confirmation">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password Confirmation"
                        required
                        onChange={handleConfirmChange}
                        isInvalid={!!confirmError}
                    />
                    <Form.Control.Feedback type="invalid">
                        {confirmError}
                    </Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
            <Button variant="outline-primary" type="submit">Sign Up</Button>
        </Form>
    </Container>
};

export const SignUpLink = () => (
    <p>
      Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);

export default compose(withRouter,withFirebase)(SignUp);
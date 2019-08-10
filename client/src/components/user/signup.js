import React, { useState, useContext } from 'react';
import { Container, Button, Form, Col, InputGroup } from 'react-bootstrap';
import { FirebaseContext } from '../../utils/firebase';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

const SignUp = () => {
    const firebase = useContext(FirebaseContext);
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
        setValidated(true);

        firebase
            .doCreateUserWithEmailAndPassword(email, password)
            .then(authUser => {
                console.log(authUser);
                this.props.history.push('/');
            }).catch(error => handleErrors(error))
    };

    const handleErrors = error => {
        console.log(error.code, error.message);
    };

    const handleConfirmChange = e => {
        e.preventDefault();
        if (pass.current.value !== e.target.value) {
            setConfirmError("Passwords don't match");
        } else {
            setConfirmError('');
        }
    };

    return <Container style={{ width: '60%' }}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Row>
                <Form.Group as={Col} md="4" controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="First Name"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Please enter a name.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="lastName">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Last Name"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Please enter a name.
                    </Form.Control.Feedback>
                </Form.Group>
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
            </Form.Row>
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

export default SignUp;
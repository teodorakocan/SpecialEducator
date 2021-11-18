import React, { useState } from 'react';
import { Container, Header, Image, Segment, Grid, Icon, Button, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import axiosInstance from '../serverConnection/axios';
import logo from '../images/main_logo.png';

function Login(props) {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errorMessages, setErrorMessages] = useState();
    const [hasError, setHasError] = useState(false);
    const [hidePassword, setHidePassword] = useState(true);

    function isInputsValid() {
        var isValid = true;

        if (typeof email === 'undefined' || typeof password === 'undefined') {
            isValid = false;
            setHasError(true);
            setErrorMessages('Email/Password field not filled')
        }

        return isValid;
    }

    async function onLogin(e) {
        e.preventDefault();
        if (isInputsValid()) {
            const userExist = await axiosInstance.get('/user/login', {
                params: {
                    email: email,
                    password: password
                }
            });
            if (userExist.data.status === 'success') {
                localStorage.setItem('loggedIn', userExist.data.token);
                props.onHomePage(true);
            } else {
                const message = 'Email/Password is incorrect.'
                setHasError(true);
                setErrorMessages(message);
            }
        }
    }

    return (
        <Container style={{ padding: '70px' }}>
            <Segment raised color='orange'>
                <Header as='h1' icon textAlign='center'>
                    <Image circular src={logo} />
                    <Header.Content>LOGIN</Header.Content>
                </Header>

                <Grid columns='equal'>
                    <Grid.Column>
                    </Grid.Column>
                    <Grid.Column>
                        <Form onSubmit={onLogin}>
                            {hasError && <div style={{ color: 'red' }}>{errorMessages}</div>}
                            <br />
                            <Form.Field>
                                <label style={{ textAlign: 'center' }}>Email</label>
                                <input placeholder='john@gmail.com' onChange={(e) => setEmail(e.target.value)} />
                            </Form.Field>
                            <Form.Field>
                                <label style={{ textAlign: 'center' }} required>Password</label>
                                <input placeholder='Password...' onChange={(e) => setPassword(e.target.value)}
                                    type={hidePassword ? 'password' : 'text'} />
                            </Form.Field>

                            <Grid columns='two'>
                                <Grid.Row>
                                    <Grid.Column width={3}>
                                    </Grid.Column>
                                    <Grid.Column textAlign='center' width={10}>
                                        <Button basic color='orange' icon='eye' onMouseEnter={() => setHidePassword(false)}
                                            onMouseLeave={() => setHidePassword(true)} /> <br /><br />
                                        <Link to='/forgotPassword'>Forgot password?</Link>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid> <br />

                            <Form.Button animated circular fluid inverted color='orange'>
                                <Button.Content visible>Log in</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='sign-in' />
                                </Button.Content>
                            </Form.Button>
                            <br />
                            <Form.Group>
                                <Form.Field width={4} />
                                <Form.Field width={14}>
                                    <p style={{ color: 'orange' }}>Don't have account?
                                        <Link style={{ textAlign: 'center' }} to='/registration'> Sign up</Link>
                                    </p>
                                </Form.Field>
                            </Form.Group>
                        </Form>
                    </Grid.Column>
                    <Grid.Column>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Container>
    )
}

export default Login;
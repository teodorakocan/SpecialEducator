import React, { useState } from 'react';
import { Container, Header, Image, Segment, Grid, Button, Form, Label } from 'semantic-ui-react';
import Login from '../Login/Login';

import axiosInstance from '../serverConnection/axios';

function ResetPassword() {

    const [password, setPassword] = useState();
    const [confirmedPassword, setConfirmedPassword] = useState();
    const [hidePassword, setHidePassword] = useState(true);
    const [errorMessage, setErrorMessage] = useState();
    const [hasError, setHasError] = useState(false);
    const [nextStep, setNextStep] = useState(false);


    function validationPassword() {
        var passwordPattern = new RegExp(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=.*[!@#$%^&*_=+-]).{8,20}$/);

        if (password !== confirmedPassword) {
            setErrorMessage('Passwords do not match');
            return false;
        } else {
            if (!passwordPattern.test(password)) {
                setErrorMessage('Password must have 8-20 characters, at least one uppercase letter, one lowercase letter, one number and one special character.');
                return false;
            }
        }
        return true;
    }

    function onClickResetPassword() {
        if (validationPassword()) {
            const search = window.location.search;
            const params = new URLSearchParams(search);
            const code = params.get('resetCode');
            axiosInstance.post('/user/resetPassword', {}, {
                params: {
                    password: password,
                    resetCode: code
                }
            }).then((response) => {
                console.log(response.data);
                if (response.data.status === 'success') {
                    console.log('uspelo');
                    setNextStep(true);
                } else {
                    console.log('puklo nesto');
                    setHasError(true);
                    setErrorMessage(response.data.message);
                }
            });
        } else {
            setHasError(true)
        }
    }

    return (
        nextStep ? <Login /> :
            <Container style={{ padding: '50px' }}>
                <Segment raised color='orange' style={{ wigth: '100px' }}>
                    <Header as='h4' icon textAlign='center'>
                        <Header.Content>Enter new password.</Header.Content>
                    </Header>

                    <Grid columns='equal' style={{ padding: '10px' }}>
                        <Grid.Column >
                        </Grid.Column>
                        <Grid.Column>
                            <Form>
                                <Form.Input
                                    fluid
                                    required
                                    type={hidePassword ? 'password' : 'text'}
                                    id='form-subcomponent-shorthand-input-first-name'
                                    label='New password'
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Form.Input
                                    fluid
                                    required
                                    type={hidePassword ? 'password' : 'text'}
                                    id='form-subcomponent-shorthand-input-last-name'
                                    label='Confirm new password'
                                    onChange={(e) => setConfirmedPassword(e.target.value)}
                                />

                                {hasError && <div style={{ color: 'red' }}>{errorMessage}</div>}

                                <Grid columns='two' style={{ padding: '10px' }}>
                                    <Grid.Row>
                                        <Grid.Column width={3}>
                                        </Grid.Column>
                                        <Grid.Column textAlign='center' width={10}>
                                            <Button basic color='orange' icon='eye' onMouseEnter={() => setHidePassword(false)}
                                                onMouseLeave={() => setHidePassword(true)} /> <br /><br />
                                            <Button inverted color='orange' onClick={onClickResetPassword}>
                                                Send request
                                            </Button>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Form>
                        </Grid.Column>
                        <Grid.Column>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </Container>
    )
}

export default ResetPassword;
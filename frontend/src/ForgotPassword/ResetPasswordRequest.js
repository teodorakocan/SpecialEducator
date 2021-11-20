import React, { useState } from 'react';
import { Container, Header, Image, Segment, Grid, Button, Form, Label } from 'semantic-ui-react';

import axiosInstance from '../serverConnection/axios';
import logo from '../images/main_logo.png';
import OpenPortal from '../HelpPages/OpenPortal';

function ResetPasswordRequest() {

    const [email, setEmail] = useState();
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [openPortal, setOpenPortal] = useState(false);
    const [portalMessage, setPortalMessage] = useState();

    function onInputChange(e) {
        e.preventDefault();
        setEmail(e.target.value);
        setHasError(false);
    }

    function validateEmail() {
        var emailPattern = new RegExp(/^(('[\w-\s]+')|([\w-]+(?:\.[\w-]+)*)|('[\w-\s]+')([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        if (typeof email !== 'undefined') {
            if (!emailPattern.test(email)) {
                return false;
            } else return true;
        } else {
            return false;
        }
    }

    function onClickSendRequest() {
        if (validateEmail()) {
            axiosInstance.post('/user/resetPasswordRequest', {}, {
                params: {
                    email: email
                }
            }).then((response) => {
                if (response.data.status === 'success') {
                    setOpenPortal(true);
                    setHasError(false);
                    setPortalMessage(response.data.message);
                } else {
                    setHasError(true);
                    setErrorMessage(response.data.message);
                }
            });
            
        } else {
            setHasError(true);
            setErrorMessage('Email address is invalid.');
        }
    }

    return (
        <Container style={{ padding: '50px' }}>
            <Segment raised color='orange' style={{ wigth: '100px' }}>
                <Header as='h1' icon textAlign='center'>
                    <Image circular src={logo} />
                    <Header.Content>Reset password</Header.Content>
                </Header>
                <Header as='h5' icon textAlign='center'>
                    <Header.Content>Please insert your email address and we will send you link with witch you will be able to reset your password.</Header.Content>
                </Header>

                <Grid columns='equal' style={{ padding: '10px' }}>
                    <Grid.Column >
                    </Grid.Column>
                    <Grid.Column>
                        <Form>
                            <Form.Field>
                                <input required placeholder='john@gmail.com' onChange={onInputChange} />
                                {hasError && <Label basic color='red' pointing>{errorMessage}</Label>}
                            </Form.Field>

                            <Grid columns='two' style={{ padding: '10px' }}>
                                <Grid.Row>
                                    <Grid.Column width={3}>
                                    </Grid.Column>
                                    <Grid.Column textAlign='center' width={10}>
                                        <Button inverted color='orange' onClick={onClickSendRequest} disabled={openPortal}>
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
                {openPortal && <OpenPortal open={openPortal} message={portalMessage} handleClose={() => setOpenPortal(!openPortal)} />}
            </Segment>
        </Container>
    )
}

export default ResetPasswordRequest;
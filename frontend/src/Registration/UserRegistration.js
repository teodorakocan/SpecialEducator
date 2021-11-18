import React, { useState } from 'react';
import { Container, Header, Image, Segment, Grid, Icon, Button, Form } from 'semantic-ui-react';
import { InputFile } from 'semantic-ui-react-input-file';

import logo from '../images/main_logo.png';
import axiosInstance from '../serverConnection/axios';
import UserFormValidation from '../Validations/UserFormValidation';

function UserRegistration(props) {
    const [hidePassword, sethidePassword] = useState(true);
    const [hideConfirmationPass, sethideConfirmationPass] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [formErrorMessages, setFormErrorMessages] = useState({});

    const formErrorComponents = Object.values(formErrorMessages).map((formErrorMessage, index) =>
        <div style={{ color: 'red' }} key={index}>{formErrorMessage}</div>)

    function onInputUserChange(e, { name }) {
        e.preventDefault();
        props.onInputUserChange(e, name);
    }

    const handleUpload = (e) => {
        e.preventDefault();
        props.handleUpload(e);
    }

    async function onClickFinalStep() {
        var serverErrorMessage = {};
        const { errorMessages, formIsValid } = UserFormValidation(props.user);
        if (formIsValid) {
            const userExist = await axiosInstance.get('/user/emailValidation', {
                params: {
                    email: props.user['email']
                }
            });
            if (userExist.data.status === 'failed') {
                serverErrorMessage['notValid'] = userExist.data.message;
                setFormErrorMessages(serverErrorMessage);
                setHasError(formIsValid);
            } else {
                props.onClickFinalStep();
            }
        } else {
            setFormErrorMessages(errorMessages);
            setHasError(!formIsValid);
        }
    }

    return (
        <Container style={{ padding: '10px' }}>
            <Segment raised color='orange'>
                <Image circular src={logo} centered size='small' />
                <br />
                <Grid>
                    <Grid.Row centered>
                        <Grid.Column width={8}>
                            <Form>
                                <Form.Group>
                                    <Form.Input required width={7} label='First name' placeholder='Pierce...' name='name'
                                        onChange={onInputUserChange} defaultValue={props.user ? props.user['name'] : ''} />
                                    <Form.Input required width={7} label='Last name' placeholder='Brosnan...' name='lastName'
                                        onChange={onInputUserChange} defaultValue={props.user ? props.user['lastName'] : ''} />
                                </Form.Group>
                                <Form.Input type='email' required width={11} label='Email' placeholder='pierce@gmail.com...'
                                    name='email' onChange={onInputUserChange} defaultValue={props.user ? props.user['email'] : ''} />
                                <Form.Group>
                                    <Form.Input required width={7} label='Password' name='password' type={hidePassword ? 'password' : 'text'}
                                        defaultValue={props.user ? props.user['password'] : ''} action={<Button basic icon onClick={() => sethidePassword(!hidePassword)}>
                                            <Icon name='eye' />
                                        </Button>} onChange={onInputUserChange} />
                                    <Form.Input required width={7} label='Confirm password' name='passConfirmation' type={hideConfirmationPass ? 'password' : 'text'}
                                        defaultValue={props.user ? props.user['passConfirmation'] : ''} action={<Button basic icon onClick={() => sethideConfirmationPass(!hideConfirmationPass)}>
                                            <Icon name='eye' />
                                        </Button>} onChange={onInputUserChange} />
                                </Form.Group>

                                <Header as='h5'>Upload profile picture</Header>
                                <Grid columns='equal'>
                                    <Grid.Row>
                                        <Grid.Column>
                                            <InputFile
                                                action={<Button basic><Icon name='file' /></Button>}
                                                input={{
                                                    id: 'input-control-id',
                                                    onChange: handleUpload
                                                }}
                                            />
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Image src={props.user ? props.user['image'] : ''} size='medium' />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                                <br />
                                {hasError && formErrorComponents}
                                <br />
                                <Grid columns='equal'>
                                    <Grid.Row>
                                        <Grid.Column>
                                            <Form.Button animated floated='left' color='orange' onClick={props.onClickPrevStep}>
                                                <Button.Content visible>Previous step</Button.Content>
                                                <Button.Content hidden>
                                                    <Icon name='arrow left' />
                                                </Button.Content>
                                            </Form.Button>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Form.Button animated floated='right' color='orange' onClick={onClickFinalStep} >
                                                <Button.Content visible>Next step</Button.Content>
                                                <Button.Content hidden>
                                                    <Icon name='arrow right' />
                                                </Button.Content>
                                            </Form.Button>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </Container>
    )
}

export default UserRegistration;
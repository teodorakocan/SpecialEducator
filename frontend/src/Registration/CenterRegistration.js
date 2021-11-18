import React, { useState } from 'react';
import { Container, Image, Segment, Grid, Icon, Button, Form, Dropdown } from 'semantic-ui-react';

import logo from '../images/main_logo.png';
import states from '../Options/States';
import areaCodes from '../Options/AreaCodes';
import CenterFormValidation from '../Validations/CenterFormValidation';
import axiosInstance from '../serverConnection/axios';

function CenterRegistration(props) {
    const [hasError, setHasError] = useState(false);
    const [formErrorMessages, setFormErrorMessages] = useState({});

    const formErrorComponents = Object.values(formErrorMessages).map((formErrorMessage, index) =>
        <div style={{ color: 'red' }} key={index}>{formErrorMessage}</div>)

    function onInputCenterChange(e, { name }) {
        e.preventDefault();
        props.onInputCenterChange(e, name);
    }

    function onDropdownCenterChange(e, data) {
        e.preventDefault();
        props.onDropdownCenterChange(data);
    }

    async function onClickNextStep() {
        var serverErrorMessage = {};
        const { errorMessages, formIsValid } = CenterFormValidation(props.center);
        if (formIsValid) {
            const centerExist = await axiosInstance.get('/center/validation', {
                params: {
                    name: props.center['name'],
                    email: props.center['email']
                }
            });
            if (centerExist.data.status === 'failed') {
                serverErrorMessage['notValid'] = centerExist.data.message;
                setFormErrorMessages(serverErrorMessage);
                setHasError(formIsValid);
            } else {
                props.onClickNextStep(2);
            }
        } else {
            setFormErrorMessages(errorMessages);
            setHasError(!formIsValid);
        }
    }

    return (
        <Container style={{padding: '10px'}}>
            <Segment raised color='orange'>
                <Image circular src={logo} centered size='small' />
                <br />
                <Grid>
                    <Grid.Row centered>
                        <Grid.Column width={8}>
                            <Form>
                                <Form.Input required width={14} label='Name of center' placeholder='Special education center...'
                                    onChange={onInputCenterChange} name='name' defaultValue={props.center ? props.center['name'] : ''} />
                                <Form.Group>
                                    <Form.Input required width={7} label='Street address' placeholder='Burnham Rd...'
                                        onChange={onInputCenterChange} name='address' defaultValue={props.center ? props.center['address'] : ''} />
                                    <Form.Input required width={4} label='Address number' placeholder='24b...'
                                        onChange={onInputCenterChange} name='addressNumber' defaultValue={props.center ? props.center['addressNumber'] : ''} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Input required width={7} label='City' placeholder='London...' onChange={onInputCenterChange} name='city'
                                        defaultValue={props.center ? props.center['city'] : ''} />
                                    <Form.Dropdown required button selection width={7} label='State' placeholder='Select your country'
                                        options={states} onChange={onDropdownCenterChange} name='state' defaultValue={props.center ? props.center['state'] : ''} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Input
                                        label='Phone number'
                                        action={
                                            <Dropdown button search placeholder='Select area code' basic floating options={areaCodes}
                                                onChange={onDropdownCenterChange} name='areaCode' defaultValue={props.center ? props.center['areaCode'] : ''} />
                                        }
                                        actionPosition='left'
                                        placeholder='658 5489 584...'
                                        onChange={onInputCenterChange}
                                        name='phoneNumber'
                                        defaultValue={props.center ? props.center['phoneNumber'] : ''}
                                    />
                                </Form.Group>
                                <Form.Input type='email' required width={11} label='Email' placeholder='john@gmail.com...' onChange={onInputCenterChange}
                                    name='email' defaultValue={props.center ? props.center['email'] : ''} />
                                <br />
                                {hasError && formErrorComponents}
                                <Form.Button animated floated='right' color='orange' onClick={onClickNextStep}>
                                    <Button.Content visible>Next step</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='arrow right' />
                                    </Button.Content>
                                </Form.Button>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>

        </Container>
    )
}

export default CenterRegistration;
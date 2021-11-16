import React, { useState } from 'react';
import { Segment, Grid, Icon, Button, Form, Dropdown } from 'semantic-ui-react';

import areaCodes from '../../../Options/AreaCodes';
import ParentValidation from '../../../Validations/ParenValidation';

function AddParent(props) {

    const [hasError, setHasError] = useState(false);
    const [errorMessages, setErrorMessages] = useState({});

    const errorComponents = Object.values(errorMessages).map((errorMessage, index) =>
        <div style={{ color: 'red' }} key={index}>{errorMessage}</div>)

    function handleParentInputChange(e, { name }) {
        e.preventDefault();
        props.handleParentInputChange(name, e.target.value);
    }

    function handleParentDropdownChange(e, data) {
        e.preventDefault();
        props.handleParentDropdownChange(data);
    }

    function onClickNextStep() {
        const { errorValidationMessages, isValid } = ParentValidation(props.parent);
        if (isValid) {
            props.onClickNextStep();
        } else {
            setHasError(!isValid);
            setErrorMessages(errorValidationMessages);
        }
    }

    return (
        <Segment raised style={{ background: 'linear-gradient(to top left, #ffffff 0%, #ff9966 100%)' }}>
            <Form>
                <Form.Group>
                    <Form.Input required label='First name' placeholder='First Name' width={6}
                        name='name' onChange={handleParentInputChange} defaultValue={props.parent ? props.parent['name'] : ''} />
                    <Form.Input required label='Last name' placeholder='Last name' width={6}
                        name='lastName' onChange={handleParentInputChange} defaultValue={props.parent ? props.parent['lastName'] : ''} />
                </Form.Group>

                <Form.Input required label='E-mail' placeholder='john@gmail.com' width={12}
                    name='email' onChange={handleParentInputChange} defaultValue={props.parent ? props.parent['email'] : ''} />

                <Form.Input
                    label='Phone number'
                    width={12}
                    action={
                        <Dropdown search placeholder='Select area code' selection options={areaCodes}
                            onChange={handleParentDropdownChange} name='areaCode' defaultValue={props.parent ? props.parent['areaCode'] : ''} />
                    }
                    actionPosition='left'
                    placeholder='658 5489 584...'
                    name='phoneNumber'
                    onChange={handleParentInputChange}
                    defaultValue={props.parent ? props.parent['phoneNumberk'] : ''}
                />
            </Form><br />

            {hasError && errorComponents}

            <Grid>
                <Grid.Row columns={3}>
                    <Grid.Column width={5}>
                    </Grid.Column>
                    <Grid.Column width={5}>
                    </Grid.Column>
                    <Grid.Column>
                        <Button animated floated='right' color='orange' onClick={onClickNextStep}>
                            <Button.Content visible>Next step</Button.Content>
                            <Button.Content hidden>
                                <Icon name='arrow right' />
                            </Button.Content>
                        </Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    );
};

export default AddParent;
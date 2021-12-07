import React, { useState } from 'react';
import { Segment, Grid, Icon, Button, Form, Image } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react-17';
import { InputFile } from 'semantic-ui-react-input-file';

import ChildValidation from '../../../Validations/ChildValidation';
import '../../UserStyle.css';

function AddChild(props) {

    const [hasError, setHasError] = useState(false);
    const [errorMessages, setErrorMessages] = useState({});

    const errorComponents = Object.values(errorMessages).map((errorMessage, index) =>
        <div style={{ color: 'red' }} key={index}>{errorMessage}</div>)


    function handleChildInputChange(e, { name, value }) {
        e.preventDefault();
        var inputValue = ''
        if (name === 'dateOfBirth') {
            inputValue = value;
        } else {
            inputValue = e.target.value
        }
        props.handleChildInputChange(name, inputValue);
    };

    const handleImageUpload = (e) => {
        e.preventDefault();

        if (e.target.files.length !== 0) {
            props.handleUpload(e.target.files);
        }
    };

    function onClickNextStep() {
        const { errorValidationMessages, isValid } = ChildValidation(props.child);
        if (isValid) {
            props.onClickNextStep();
        } else {
            setHasError(!isValid);
            setErrorMessages(errorValidationMessages);
        }
    };

    return (
        <Segment raised style={{ background: 'linear-gradient(to top left, #ffffff 0%, #ff9966 100%)' }}>
            <Form>
                <Form.Group>
                    <Form.Input required label='First name' placeholder='First Name...' width={6}
                        name='name' onChange={handleChildInputChange} defaultValue={props.child ? props.child['name'] : ''} />
                    <Form.Input required label='Last name' placeholder='Last name...' width={6}
                        name='lastName' onChange={handleChildInputChange} defaultValue={props.child ? props.child['lastName'] : ''} />
                </Form.Group>
                <Form.Group>
                    <Form.Input required label='Weight' placeholder='Enter weight in kg' width={6}
                        name='weight' onChange={handleChildInputChange} defaultValue={props.child ? props.child['weight'] : ''} />
                    <Form.Input required label='Height' placeholder='Enter height in cm' width={6}
                        name='height' onChange={handleChildInputChange} defaultValue={props.child ? props.child['height'] : ''} />
                </Form.Group>
                <Form.Group>
                    <Form.Input required label='Category' placeholder='Category...' width={6}
                        name='category' onChange={handleChildInputChange} defaultValue={props.child ? props.child['category'] : ''} />
                    <Form.Input required label='Degree of disability' placeholder='Degree of disability...' width={6}
                        name='degreeOfDisability' onChange={handleChildInputChange} defaultValue={props.child ? props.child['degreeOfDisability'] : ''} />
                </Form.Group>
                <DateInput
                    required
                    width={6}
                    dateFormat='YYYY-MM-DD'
                    name='dateOfBirth'
                    label='Date of birth'
                    placeholder='Date'
                    iconPosition='left'
                    maxDate={new Date()}
                    value={props.child ? props.child['dateOfBirth'] : ''}
                    onChange={handleChildInputChange}
                />
            </Form><br />

            <Grid columns='equal'>
                <Grid.Row>
                    <Grid.Column>
                        <InputFile
                            action={<Button basic><Icon name='file' /></Button>}
                            input={{
                                id: 'input-control-id',
                                onChange: handleImageUpload
                            }}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Image src={props.child ? props.child['image'] : ''} style={{
                            width: 400,
                            height: 400
                        }} />
                    </Grid.Column>
                </Grid.Row>
            </Grid><br />

            {hasError && errorComponents}
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
                        <Form.Button animated floated='right' color='orange' onClick={onClickNextStep} >
                            <Button.Content visible>Next step</Button.Content>
                            <Button.Content hidden>
                                <Icon name='arrow right' />
                            </Button.Content>
                        </Form.Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    )
};

export default AddChild;
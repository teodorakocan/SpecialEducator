import React from 'react';
import { Segment, Grid, TextArea, Button, Form, Icon, Header } from 'semantic-ui-react';

function AddAnamnesis(props) {

    function handleAnamnesisInputChanges(e, { name }) {
        e.preventDefault();
        props.handleAnamnesisInputChanges(name, e.target.value);
    }

    return (
        <Segment raised style={{ background: 'linear-gradient(to top left, #ffffff 0%, #ff9966 100%)' }}>
            <Header as='h1' icon textAlign='center'>
                <Header.Content>Child anamnesis</Header.Content>
            </Header>
            <Form>
                <p style={{ fontSize: '14px', fontFamily: 'Verdana, Arial, Helvetica, sans-serif' }}>
                    Description of pregnancy</p>
                <TextArea placeholder='Describe...' style={{ minHeight: 100 }} name='descriptionOfPregnancy'
                    onChange={handleAnamnesisInputChanges}
                    defaultValue={props.anamnesis ? props.anamnesis['descriptionOfPregnancy'] : ''} />

                <p style={{ fontSize: '14px', fontFamily: 'Verdana, Arial, Helvetica, sans-serif' }}>
                    Description of childbirth</p>
                <TextArea placeholder='Describe...' style={{ minHeight: 100 }} name='descriptionOfChildBirth'
                    onChange={handleAnamnesisInputChanges}
                    defaultValue={props.anamnesis ? props.anamnesis['descriptionOfChildBirth'] : ''} />

                <p style={{ fontSize: '14px', fontFamily: 'Verdana, Arial, Helvetica, sans-serif' }}>
                    Description of the child’s behavior</p>
                <TextArea placeholder='Describe...' style={{ minHeight: 100 }} name='descriptionOfBehavior'
                    onChange={handleAnamnesisInputChanges}
                    defaultValue={props.anamnesis ? props.anamnesis['descriptionOfBehavior'] : ''} />

                <p style={{ fontSize: '14px', fontFamily: 'Verdana, Arial, Helvetica, sans-serif' }}>
                    Diagnosis of the child</p>
                <TextArea placeholder='Describe...' style={{ minHeight: 100 }} name='diagnosis'
                    onChange={handleAnamnesisInputChanges}
                    defaultValue={props.anamnesis ? props.anamnesis['diagnosis'] : ''} />

                <p style={{ fontSize: '14px', fontFamily: 'Verdana, Arial, Helvetica, sans-serif' }}>
                    Description (notes)</p>
                <TextArea placeholder='Describe...' style={{ minHeight: 100 }} name='description'
                    onChange={handleAnamnesisInputChanges}
                    defaultValue={props.anamnesis ? props.anamnesis['description'] : ''} />
            </Form><br />

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
                        <Form.Button animated floated='right' color='orange' onClick={props.onClickNextStep} >
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

export default AddAnamnesis;
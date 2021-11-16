import React from 'react';
import { Icon, Step, Container, Grid } from 'semantic-ui-react'

function Steps({ step }) {

    return (
        <div>
            <br/>
            <Container>
                <Grid>
                    <Grid.Row centered>
                        <Step.Group>
                            <Step active={step === 1 ? true : false}>
                                <Icon name='building' />
                                <Step.Content>
                                    <Step.Title>Center registration</Step.Title>
                                    <Step.Description>Enter center information</Step.Description>
                                </Step.Content>
                            </Step>

                            <Step active={step === 2 ? true : false}>
                                <Icon name='user' />
                                <Step.Content>
                                    <Step.Title>Admin registration</Step.Title>
                                    <Step.Description>Enter admin's information</Step.Description>
                                </Step.Content>
                            </Step>
                        </Step.Group>
                    </Grid.Row>
                </Grid>
            </Container>
        </div>
    )
}

export default Steps;
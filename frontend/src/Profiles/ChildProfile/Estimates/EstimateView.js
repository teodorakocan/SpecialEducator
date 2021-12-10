import React from 'react';
import { useParams } from 'react-router-dom';
import { Header, Container, Segment, Grid } from 'semantic-ui-react';
import useGetEstimateById from '../../../hooks/useGetEstimateById';

function EstimateView() {
    const { id } = useParams();
    const [estimate, date] = useGetEstimateById(id);
    console.log(estimate);
    console.log(date);

    return (
        Object.values(estimate).map((items, index) =>
            <Container style={{ padding: '15px' }} key={index}>
                <Segment raised color='orange'>
                    <Header style={{ fontSize: '32px', fontFamily: 'Verdana, Arial, Helvetica, sans-serif', color: '#ff5500' }} textAlign='center'>
                        Estimate - {date}
                    </Header>

                    <Grid columns={2} style={{ padding: '5px' }}>
                        <Grid.Row>
                            <Grid.Column>
                                <Segment basic style={{ fontSize: '20px', color: '#ff5500', textDecoration: 'underline' }}>
                                    Gross motor skils:
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment basic textAlign='left' style={{ fontSize: '17px' }}>
                                    {items.grossMotorSkils}
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column>
                                <Segment basic style={{ fontSize: '17px', color: '#ff5500' }}>
                                    Grade for Gross motor skils:
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment basic textAlign='left' style={{ fontSize: '15px' }}>
                                    {items.grossMotorSkilsMark}
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column>
                                <Segment basic style={{ fontSize: '20px', color: '#ff5500', textDecoration: 'underline' }}>
                                    Fine motor skils:
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment basic textAlign='left' style={{ fontSize: '17px' }}>
                                    {items.fineMotorSkils}
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column>
                                <Segment basic style={{ fontSize: '17px', color: '#ff5500' }}>
                                    Grade for fine motor skils:
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment basic textAlign='left' style={{ fontSize: '15px' }}>
                                    {items.fineMotorSkilsMark}
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column>
                                <Segment basic style={{ fontSize: '20px', color: '#ff5500', textDecoration: 'underline' }}>
                                    Perceptual Abilities:
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment basic textAlign='left' style={{ fontSize: '17px' }}>
                                    {items.perceptualAbilities}
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column>
                                <Segment basic style={{ fontSize: '17px', color: '#ff5500' }}>
                                    Grade for Perceptual Abilities:
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment basic textAlign='left' style={{ fontSize: '15x' }}>
                                    {items.perceptualAbilitiesMark}
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column>
                                <Segment basic style={{ fontSize: '20px', color: '#ff5500', textDecoration: 'underline' }}>
                                    Speaking skils:
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment basic textAlign='left' style={{ fontSize: '17px' }}>
                                    {items.speakingSkils}
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column>
                                <Segment basic style={{ fontSize: '17px', color: '#ff5500' }}>
                                    Grade for speaking skils:
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment basic textAlign='left' style={{ fontSize: '15px' }}>
                                    {items.speakingSkilsMark}
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column>
                                <Segment basic style={{ fontSize: '20px', color: '#ff5500', textDecoration: 'underline' }}>
                                    Socio emotional development:
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment basic textAlign='left' style={{ fontSize: '17px' }}>
                                    {items.socioEmotionalDevelopment}
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column>
                                <Segment basic style={{ fontSize: '17px', color: '#ff5500' }}>
                                    Grade for socio emotional development:
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment basic textAlign='left' style={{ fontSize: '15px' }}>
                                    {items.socioEmotionalDevelopmentMark}
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column>
                                <Segment basic style={{ fontSize: '20px', color: '#ff5500', textDecoration: 'underline' }}>
                                    Intellectual ability:
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment basic textAlign='left' style={{ fontSize: '17px' }}>
                                    {items.intellectualAbility}
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column>
                                <Segment basic style={{ fontSize: '17px', color: '#ff5500' }}>
                                    Grade for intellectual ability:
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment basic textAlign='left' style={{ fontSize: '15px' }}>
                                    {items.intellectualAbilityMark}
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Container>
        )
    )
}

export default EstimateView;
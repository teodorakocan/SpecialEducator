import React, { useEffect, useState } from 'react';
import { Header, Container, Segment, Grid } from 'semantic-ui-react';
import { useNavigate } from 'react-router';

import axiosInstance from '../serverConnection/axios';
import {authHeader} from '../serverConnection/authHeader';

function ViewChildsAnamnesis(props) {
    const [anamnesis, setAnamnesis] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.get('/authUser/getChildAnamnesis', {
            headers: authHeader(),
            params: {
                childId: props.childId
            }
        })
            .then((response) => {
                if (response.data.status === 'success') {
                    setAnamnesis(response.data.anamnesis);
                }
            }).catch((error) => {
                if (typeof error.response === 'undefined') {
                    navigate('/notFound');
                } else if (error.response.status === 403) {
                    navigate('/notAuthenticated');
                } else {
                    navigate('/notFound');
                }
            })
    }, [props.childId]);

    return (
        <Container style={{ padding: '15px' }}>
            <Segment raised color='orange'>
                <Header as='h1' icon textAlign='center'>
                    <Header.Content style={{ color: 'orange', fontSize: '36px' }}>Child's anamnesis</Header.Content>
                </Header>
                <Grid columns={2} style={{ padding: '5px' }}>
                    <Grid.Row>
                        <Grid.Column>
                            <Segment basic style={{ fontSize: '20px', color: '#ff5500', textDecoration: 'underline' }}>
                                Description:
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment basic textAlign='left' style={{ fontSize: '17px' }}>
                                {anamnesis.description}
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <Segment basic style={{ fontSize: '17px', color: '#ff5500' }}>
                                Description of pregnancy:
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment basic textAlign='left' style={{ fontSize: '15px' }}>
                                {anamnesis.descriptionOfPregnancy}
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <Segment basic style={{ fontSize: '20px', color: '#ff5500', textDecoration: 'underline' }}>
                                Description of behavior:
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment basic textAlign='left' style={{ fontSize: '17px' }}>
                                {anamnesis.descriptionOfBehavior}
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <Segment basic style={{ fontSize: '17px', color: '#ff5500' }}>
                                Description of child birth:
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment basic textAlign='left' style={{ fontSize: '15px' }}>
                                {anamnesis.descriptionOfChildBirth}
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <Segment basic style={{ fontSize: '20px', color: '#ff5500', textDecoration: 'underline' }}>
                                Diagnosis:
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment basic textAlign='left' style={{ fontSize: '17px' }}>
                                {anamnesis.diagnosis}
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>

                </Grid>
            </Segment>
        </Container>
    )
}

export default ViewChildsAnamnesis;
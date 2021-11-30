import React from 'react';
import { useParams } from 'react-router-dom';
import { Header, Container, Segment, Grid } from 'semantic-ui-react';

import useGetDailyReportById from '../../../../hooks/useGetDailyReportById';

function DailyReportView() {
    const { id } = useParams();
    const [dailyReport, date] = useGetDailyReportById(id);

    return (
        Object.values(dailyReport).map((items, index) =>
            <Container style={{ padding: '15px' }} key={index}>
                <Segment raised color='orange'>
                    <Header style={{ fontSize: '32px', fontFamily: 'Verdana, Arial, Helvetica, sans-serif', color: '#ff5500' }}
                        textAlign='center'>Daily report on date {date}
                    </Header>

                    <Grid columns={2} style={{ padding: '5px' }}>
                        <Grid.Row>
                            <Grid.Column>
                                <Segment basic style={{ fontSize: '20px', color: '#ff5500', textDecoration: 'underline' }}>
                                    Report:
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment basic textAlign='left' style={{ fontSize: '17px' }}>
                                    {items.report}
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column>
                                <Segment basic style={{ fontSize: '20px', color: '#ff5500', textDecoration: 'underline' }}>
                                    Problems:
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment basic textAlign='left' style={{ fontSize: '17px' }}>
                                    {items.problems}
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column>
                                <Segment basic style={{ fontSize: '20px', color: '#ff5500', textDecoration: 'underline' }}>
                                    Recommendation for teacher:
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment basic textAlign='left' style={{ fontSize: '17px' }}>
                                    {items.recommendationForTeacher}
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column>
                                <Segment basic style={{ fontSize: '20px', color: '#ff5500', textDecoration: 'underline' }}>
                                    Recommendation for parent:
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment basic textAlign='left' style={{ fontSize: '17px' }}>
                                    {items.recommendationForParent}
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column>
                                <Segment basic style={{ fontSize: '20px', color: '#ff5500', textDecoration: 'underline' }}>Assessment of the child's behavior on time:</Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment basic textAlign='left' style={{ fontSize: '17px' }}>{items.mark}</Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Container>
        )
    )
}

export default DailyReportView;
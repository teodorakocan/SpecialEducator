import React from 'react';
import { Grid, Segment } from 'semantic-ui-react'

function CenterData(props) {

    return (
        <Segment raised style={{ background: 'linear-gradient(to top left, #ffffff 0%, #ff9966 100%)' }}>
            <Grid columns={2} celled='internally'>
                <Grid.Row>
                    <Grid.Column width={7}>
                        <Segment style={{ fontSize: '22px', fontWeight: 'bold', color: '#ff5500', fontFamily: 'Verdana, Arial, Helvetica, sans-serif' }} basic>
                            Name
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment basic style={{ fontSize: '18px' }}>{props.center['name']}</Segment>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={7}>
                        <Segment style={{ fontSize: '22px', fontWeight: 'bold', color: '#ff5500', fontFamily: 'Verdana, Arial, Helvetica, sans-serif' }} basic>
                            E-mail
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment basic style={{ fontSize: '18px' }}>{props.center['email']} </Segment>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={7}>
                        <Segment style={{ fontSize: '22px', fontWeight: 'bold', color: '#ff5500', fontFamily: 'Verdana, Arial, Helvetica, sans-serif' }} basic>
                            Address
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment basic style={{ fontSize: '18px' }}>{props.center['address'] + ', ' + props.center['addressNumber']} </Segment>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={7}>
                        <Segment style={{ fontSize: '22px', fontWeight: 'bold', color: '#ff5500', fontFamily: 'Verdana, Arial, Helvetica, sans-serif' }} basic>
                            City
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment basic style={{ fontSize: '18px' }}>{props.center['city']} </Segment>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={7}>
                        <Segment style={{ fontSize: '22px', fontWeight: 'bold', color: '#ff5500', fontFamily: 'Verdana, Arial, Helvetica, sans-serif' }} basic>
                            State
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment basic style={{ fontSize: '18px' }}>{props.center['state']} </Segment>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={7}>
                        <Segment style={{ fontSize: '22px', fontWeight: 'bold', color: '#ff5500', fontFamily: 'Verdana, Arial, Helvetica, sans-serif' }} basic>
                            <div>Phone number</div>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment basic style={{ fontSize: '18px' }}>{props.center['areaCode'] + ' ' + props.center['phoneNumber']} </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    )
}

export default CenterData;
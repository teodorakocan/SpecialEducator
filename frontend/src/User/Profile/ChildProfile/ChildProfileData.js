import React from 'react';
import { Grid, Image, Card } from 'semantic-ui-react'
import useChildData from '../../../hooks/useChildData';

import Schedule from '../Schedule'

function ChildProfileData(props) {

    const [child, appointments] = useChildData(props.childId);

    const childData = Object.values(child).map((child, index) =>
        <Card key={index}>
            <Image src={child.image} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{child.name}</Card.Header>
                <Card.Meta>
                    <span className='date'>{'Date of birth: ' + child.dateOfBirth}</span>
                </Card.Meta>
            </Card.Content>
        </Card>
    )

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width={4}>
                    {childData}
                </Grid.Column>
                <Grid.Column width={10}>
                    <Schedule appointments={appointments} child={child} role={props.role} />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default ChildProfileData;
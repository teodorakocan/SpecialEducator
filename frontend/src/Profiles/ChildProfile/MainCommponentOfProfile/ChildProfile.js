import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';

import MenuItems from './MenuItems';
import ChildProfileBoard from './ChildProfileBoard';

function ChildProfile(props) {

    const [activeItem, setActiveItem] = useState('profile');

    function handleChangeActiveItem(name) {
        setActiveItem(name);
    }

    return (
        <Grid style={{ padding: '10px' }}>
            <Grid.Row>
                <MenuItems handleChangeActiveItem={handleChangeActiveItem} activeItem={activeItem} teacherRole={props.teacherRole} />
            </Grid.Row>

            <Grid.Row>
                <ChildProfileBoard activeItem={activeItem} childId={props.childId} role={props.role} teacherRole={props.teacherRole} />
            </Grid.Row>
        </Grid>
    )
}

export default ChildProfile;
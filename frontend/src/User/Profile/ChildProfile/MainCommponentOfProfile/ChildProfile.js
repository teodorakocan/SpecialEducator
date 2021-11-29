import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';

import MenuItems from './MenuItems';
import ChildProfileBoard from './ChildProfileBoard';
import useChildData from '../../../../hooks/useChildData';

function ChildProfile(props) {
    
    const [activeItem, setActiveItem] = useState('profile');
    
    function handleChangeActiveItem(name) {
        setActiveItem(name);
    }

    return (
        <Grid columns={2} style={{ padding: '10px' }}>
            <Grid.Row>
                <Grid.Column>
                    <MenuItems handleChangeActiveItem={handleChangeActiveItem} activeItem={activeItem} teacherRole={props.teacherRole} />
                </Grid.Column>
            </Grid.Row>

            <ChildProfileBoard activeItem={activeItem} childId={props.childId} role={props.role} />

        </Grid>
    )
}

export default ChildProfile;
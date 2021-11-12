import React, { useState } from 'react';
import { Segment, Grid, Button, Input, Checkbox, Divider } from 'semantic-ui-react';

import '../UserStyle.css';

function ChangePassword() {

    const [checked, setChecked] = useState(false);
    
    return (
        <Segment raised>
            <Divider horizontal>New password</Divider><br/>
            <Grid textAlign='center'>
                <Grid.Row>
                    <Grid.Column>
                        <Input type={checked ? 'text' : 'password'} size='large' placeholder='Old password..' />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column >
                        <Input type={checked ? 'text' : 'password'} size='large' placeholder='New password..' />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column >
                        <Input type={checked ? 'text' : 'password'} size='large' placeholder='Confirm new password..' />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <Checkbox toggle
                            label={<label>See password</label>}
                            onChange={() => setChecked(!checked)}
                            checked={checked} />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <Button color='orange' floated='right'>Change password</Button>
                    </Grid.Column>
                </Grid.Row>

            </Grid>
        </Segment>
    )
};

export default ChangePassword;
import React, { useState } from 'react';
import { Container, Header, Segment, Grid, Button, Form } from 'semantic-ui-react';

function CheckParentPassword(props) {

    const [hidePassword, setHidePassword] = useState(true);
    const [password, setPassword] = useState();
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    function onClickSendRequest() {
        if(password){
            props.CheckPassword(password);
        }else{
            setHasError(true);
            setErrorMessage('Password field is required');
        }
    }

    return (
        <Container style={{ padding: '50px' }}>
            <Segment raised color='orange' style={{ wigth: '100px', padding: '20px' }}>
                <Header as='h3' icon textAlign='center'>
                    <Header.Content>Enter password to see diagrams.</Header.Content>
                </Header>

                <Grid columns='equal' style={{ padding: '10px' }}>
                    <Grid.Column >
                    </Grid.Column>
                    <Grid.Column>
                        <Form>
                            <Form.Input
                                fluid
                                required
                                type={hidePassword ? 'password' : 'text'}
                                label='Password'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {hasError && <div style={{ color: 'red' }}>{errorMessage}</div>}
                            <Grid columns='two' style={{ padding: '10px' }}>
                                <Grid.Row>
                                    <Grid.Column width={3}>
                                    </Grid.Column>
                                    <Grid.Column textAlign='center' width={10}>
                                        <Button basic color='orange' icon='eye' onMouseEnter={() => setHidePassword(false)}
                                            onMouseLeave={() => setHidePassword(true)} /> <br /><br />
                                        <Button inverted color='orange' onClick={onClickSendRequest}>
                                            Send request
                                        </Button>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Form>
                    </Grid.Column>
                    <Grid.Column>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Container>
    )
}

export default CheckParentPassword;
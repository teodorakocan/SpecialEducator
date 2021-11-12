import React, { useState } from 'react';
import { Segment, Grid, Button, Input } from 'semantic-ui-react';

import '../UserStyle.css';
import UserDataChangeValidation from '../../Validations/UserDataChangeValidation';
import axiosInstance from '../../serverConnection/axios';
import { authHeader } from '../../serverConnection/authHeader';

function Profile(props) {

    const [userData, setUserData] = useState(props.user);
    const [errorMessages, setErrorMessages] = useState({});
    const [hasError, setHasError] = useState(false);

    const validationErrorComponents = Object.values(errorMessages).map((errorMessage, index) =>
        <div style={{ color: 'red' }} key={index}>{errorMessage}</div>)


    function onInputChange(e, { name }) {
        e.preventDefault();
        var userChange = userData;
        userChange[name] = e.target.value;
        setUserData(userChange);
        setHasError(false);
    }

    function onChangeData(e) {
        e.preventDefault();
        const { errorValidationMessages, isValid } = UserDataChangeValidation(userData);
        var serverErrorMessage = {};
        if (isValid) {
            axiosInstance.get('/api/user/changeData', {
                headers: authHeader(),
                params: {
                    user: userData
                }
            })
                .then((resposnse) => {
                    if (resposnse.data.status === 'failed') {
                        serverErrorMessage['notValid'] = resposnse.data.message;
                        setErrorMessages(serverErrorMessage);
                        setHasError(isValid);
                    } else {
                        props.onChangeData();
                    }
                });
        } else {
            setErrorMessages(errorValidationMessages);
            setHasError(!isValid);
        }
    }

    return (
        <Segment raised>
            <Grid columns={2}>
                <Grid.Row divided>
                    <Grid.Column>
                        <p className='userProperty'>Name</p>
                    </Grid.Column>
                    <Grid.Column>
                        <Input fluid defaultValue={userData['name']} name='name' onChange={onInputChange}
                            error={hasError ? true : false} />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row divided>
                    <Grid.Column>
                        <p className='userProperty'>Last name</p>
                    </Grid.Column>
                    <Grid.Column>
                        <Input fluid defaultValue={userData['lastName']} name='lastName' onChange={onInputChange} />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row divided>
                    <Grid.Column>
                        <p className='userProperty'>Email</p>
                    </Grid.Column>
                    <Grid.Column>
                        <Input fluid defaultValue={userData['email']} name='email' onChange={onInputChange} />
                    </Grid.Column>
                </Grid.Row><br />

                {hasError && <Grid.Row divided>
                    <Grid.Column>
                        {validationErrorComponents}
                    </Grid.Column>
                </Grid.Row>}
                <Grid.Row>
                    <Grid.Column>
                    </Grid.Column>
                    <Grid.Column>
                        <Button color='orange' floated='right' onClick={onChangeData}>Change</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    )
};

export default Profile;
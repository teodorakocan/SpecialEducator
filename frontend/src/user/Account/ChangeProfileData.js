import React, { useState } from 'react';
import { Segment, Grid, Button, Input } from 'semantic-ui-react';
import { useNavigate } from 'react-router';

import '../UserStyle.css';
import UserDataChangeValidation from '../../Validations/UserDataChangeValidation';
import OpenPortal from '../../HelpPages/OpenPortal';
import axiosInstance from '../../serverConnection/axios';
import { authHeader } from '../../serverConnection/authHeader';

function ChangeProfileData(props) {

    const [userData, setUserData] = useState(props.user);
    const [errorMessages, setErrorMessages] = useState({});
    const [hasError, setHasError] = useState(false);
    const [openPortal, setOpenPortal] = useState(false);
    const [portalMessage, setPortalMessage] = useState('');
    const navigate = useNavigate();

    const validationErrorComponents = Object.values(errorMessages).map((errorMessage, index) =>
        <div style={{ color: 'red' }} key={index}>{errorMessage}</div>)


    function onInputChange(e, { name }) {
        e.preventDefault();
        var userChange = userData;
        userChange[name] = e.target.value;
        setUserData(userChange);
    }

    function onClickChangeUserData() {
        const { errorValidationMessages, isValid } = UserDataChangeValidation(userData);
        var serverErrorMessage = {};
        if (isValid) {
            axiosInstance.post('/authUser/changeUserData', {}, {
                headers: authHeader(),
                params: {
                    user: userData
                }
            })
                .then((response) => {
                    if (response.data.status === 'failed') {
                        serverErrorMessage['notValid'] = response.data.message;
                        setErrorMessages(serverErrorMessage);
                        setHasError(isValid);
                    } else {
                        setOpenPortal(isValid);
                        setHasError(!isValid);
                        setErrorMessages(serverErrorMessage);
                        setPortalMessage(response.data.message);
                        props.onClickChangeUserData();
                    }
                }).catch((error) => {
                    if (typeof error.response === 'undefined') {
                        navigate('/notFound');
                    } else if (error.response.status === 403) {
                        navigate('/notAuthenticated');
                    } else if (error.response.status === 404) {
                        navigate('/notFound');
                    } else {
                        navigate('/notAuthorized');
                    }
                });
        } else {
            setErrorMessages(errorValidationMessages);
            setHasError(!isValid);
        }
    }

    return (
        <Segment raised style={{ background: 'linear-gradient(to top left, #ffffff 0%, #ff9966 100%)' }}>
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
                        <Input fluid defaultValue={userData['lastName']} name='lastName' onChange={onInputChange}
                            error={hasError ? true : false} />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row divided>
                    <Grid.Column>
                        <p className='userProperty'>Email</p>
                    </Grid.Column>
                    <Grid.Column>
                        <Input fluid defaultValue={userData['email']} name='email' onChange={onInputChange}
                            error={hasError ? true : false} />
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
                        <Button color='orange' floated='right' onClick={onClickChangeUserData}>Change</Button>
                    </Grid.Column>
                </Grid.Row>
                {openPortal && <OpenPortal open={openPortal} message={portalMessage} handleClose={() => setOpenPortal(!openPortal)} />}
            </Grid>
        </Segment>
    )
};

export default ChangeProfileData;
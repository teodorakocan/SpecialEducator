import React, { useState } from 'react';
import { Segment, Grid, Button, Input, Checkbox, Divider } from 'semantic-ui-react';

import '../UserStyle.css';
import PasswordValidation from '../../Validations/PasswordValidation';
import { authHeader } from '../../serverConnection/authHeader';
import axiosInstance from '../../serverConnection/axios';
import OpenPortal from '../../HelpPages/OpenPortal';
import { useNavigate } from 'react-router';

function ChangePassword(props) {

    const [checked, setChecked] = useState(false);
    const [password, setPassword] = useState({});
    const [hasError, setHasError] = useState(false);
    const [errorMessages, setErrorMessages] = useState({});
    const [openPortal, setOpenPortal] = useState(false);
    const [portalMessage, setPortalMessage] = useState('');
    const navigate = useNavigate();

    const validationErrorComponents = Object.values(errorMessages).map((errorMessage, index) =>
        <div style={{ color: 'red' }} key={index}>{errorMessage}</div>)


    function onInputChange(e, { name }) {
        e.preventDefault();
        var newPassword = password;
        newPassword[name] = e.target.value;
        setPassword(newPassword);
        setHasError(false);
    }

    function onClickChangePassword() {
        const { errorValidationMessages, isValid } = PasswordValidation(password);
        var serverErrorMessage = {};
        if (isValid) {
            axiosInstance.post('/api/user/changePassword', {}, {
                headers: authHeader(),
                params: {
                    newPassword: password['newPassword'],
                    oldPassword: password['oldPassword']
                }
            }).then((response) =>{
                if (response.data.status === 'failed') {
                    serverErrorMessage['notValid'] = response.data.message;
                    setErrorMessages(serverErrorMessage);
                    setHasError(isValid);
                } else {
                    setOpenPortal(isValid);
                    setHasError(!isValid);
                    setErrorMessages(serverErrorMessage);
                    setPortalMessage(response.data.message);
                }
            }).catch((error) => {
                if (error.response.status === 401) {
                    navigate('/notAuthorized');
                } else {
                    navigate('notFound');
                }
            })

                
        } else {
            setHasError(!isValid);
            setErrorMessages(errorValidationMessages);
        }
    }

    return (
        <Segment raised>
            <Divider horizontal>New password</Divider><br />
            <Grid textAlign='center'>
                <Grid.Row>
                    <Grid.Column>
                        <Input type={checked ? 'text' : 'password'} size='large' placeholder='Old password..'
                            name='oldPassword' onChange={onInputChange} error={hasError ? true : false} />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column >
                        <Input type={checked ? 'text' : 'password'} size='large' placeholder='New password..'
                            name='newPassword' onChange={onInputChange} error={hasError ? true : false} />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column >
                        <Input type={checked ? 'text' : 'password'} size='large' placeholder='Confirm new password..'
                            name='passConfirmation' onChange={onInputChange} error={hasError ? true : false} />
                    </Grid.Column>
                </Grid.Row>

                {hasError && <Grid.Row divided>
                    <Grid.Column>
                        {validationErrorComponents}
                    </Grid.Column>
                </Grid.Row>}
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
                        <Button color='orange' floated='right' onClick={onClickChangePassword} disabled={openPortal ? true : false}>
                            Change password
                            </Button>
                    </Grid.Column>
                </Grid.Row>
                {openPortal && <OpenPortal open={openPortal} message={portalMessage} handleClose={() => setOpenPortal(!openPortal)} />}
            </Grid>
        </Segment>
    )
};

export default ChangePassword;
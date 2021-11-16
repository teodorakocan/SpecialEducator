import React, { useState } from 'react';
import { Segment, Grid, Icon, Button, Form, Header, Image } from 'semantic-ui-react';
import { InputFile } from 'semantic-ui-react-input-file';
import { useNavigate } from 'react-router';

import axiosInstance from '../../../serverConnection/axios';
import { authHeader } from '../../../serverConnection/authHeader';
import OpenPortal from '../../../HelpPages/OpenPortal';
import NewUserValidation from '../../../Validations/NewUserValidation';

const roles = [
    { key: 'admin', value: 'admin', text: 'Admin' },
    { key: 'teacher', value: 'teacher', text: 'Teacher' }
]

function AddNewUser() {

    const [user, setUser] = useState({});
    const [resetUser, setResetUser] = useState({});
    const [hidePassword, setHidePassword] = useState(true);
    const [selectedFile, setSelectedFile] = useState([]);
    const [imageURL, setImageUrl] = useState(null);
    const [hasError, setHasError] = useState(false);
    const [formErrorMessages, setFormErrorMessages] = useState({});
    const [openPortal, setOpenPortal] = useState(false);
    const [portalMessage, setPortalMessage] = useState();
    const navigate = useNavigate();

    const formErrorComponents = Object.values(formErrorMessages).map((formErrorMessage, index) =>
        <div style={{ color: 'red' }} key={index}>{formErrorMessage}</div>)

    function handleInputChange(e, { name }) {
        e.preventDefault();
        var userData = user;
        userData[name] = e.target.value;
        setUser(userData);
    }

    const handleImageUload = (e) => {
        e.preventDefault();
        if (e.target.files.length !== 0) {
            var userData = user;
            userData['image'] = URL.createObjectURL(e.target.files[0]);
            setSelectedFile(e.target.files);
            setUser(userData);
            setImageUrl(URL.createObjectURL(e.target.files[0]))
        }
    }

    function onDropdownChange(e, data) {
        e.preventDefault();
        var userData = user;
        userData[data.name] = data.value;
        setResetUser(userData);
    }

    function onClickAddNewUser() {
        var serverErrorMessage = {};
        var formData = new FormData();
        formData.append('file', selectedFile[0]);

        const { errorValidationMessages, isValid } = NewUserValidation(user);
        if (isValid) {
            axiosInstance.post('/admin/addNewUser', formData, {
                headers: authHeader(),
                params: {
                    user: user
                }
            }).then((newUser) => {
                if (newUser.data.status === 'failed') {
                    serverErrorMessage['notValid'] = newUser.data.message;
                    setFormErrorMessages(serverErrorMessage);
                    setHasError(isValid);
                } else {
                    setFormErrorMessages(serverErrorMessage);
                    setHasError(!isValid);
                    setOpenPortal(isValid);
                    setPortalMessage(newUser.data.message);
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
            setFormErrorMessages(errorValidationMessages);
            setHasError(!isValid);
        }
    }

    return (
        <Segment raised style={{ background: 'linear-gradient(to top left, #ffffff 0%, #ff9966 100%)' }}>
            <Form>
                <Form.Group>
                    <Form.Input required width={7} label='First name' placeholder='Pierce...' name='name'
                        onChange={handleInputChange} />
                    <Form.Input required width={7} label='Last name' placeholder='Brosnan...' name='lastName'
                        onChange={handleInputChange} />
                </Form.Group>
                <Form.Input type='email' required width={11} label='E-mail' name='email' placeholder='pierce@gmail.com...'
                    onChange={handleInputChange} />
                <Form.Input required width={7} label='Password' name='password' type={hidePassword ? 'password' : 'text'}
                    action={<Button basic icon onClick={() => setHidePassword(!hidePassword)}>
                        <Icon name='eye' />
                    </Button>}
                    onChange={handleInputChange} />
                <Form.Dropdown required button selection width={5} label='Role' placeholder='Select your user role'
                    options={roles} onChange={onDropdownChange} name='role' />

                <Header as='h5'>Upload profile picture</Header>
                <Grid columns='equal'>
                    <Grid.Row>
                        <Grid.Column>
                            <InputFile
                                action={<Button basic><Icon name='file' /></Button>}
                                input={{
                                    id: 'input-control-id',
                                    onChange: handleImageUload
                                }}
                            />
                        </Grid.Column>
                        <Grid.Column>
                            <Image src={imageURL} size='medium' />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <br />
                {hasError && formErrorComponents}
                <br />
                <Grid>
                    <Grid.Row columns={3}>
                        <Grid.Column width={5}>
                        </Grid.Column>
                        <Grid.Column width={5}>
                        </Grid.Column>
                        <Grid.Column>
                            <Button animated floated='right' color='orange' onClick={onClickAddNewUser} disabled={openPortal}>
                                <Button.Content visible>ADD</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='plus' />
                                </Button.Content>
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                    {openPortal && <OpenPortal open={openPortal} message={portalMessage} handleClose={() => setOpenPortal(!openPortal)} />}
                </Grid>
            </Form>
        </Segment>
    )
}

export default AddNewUser;
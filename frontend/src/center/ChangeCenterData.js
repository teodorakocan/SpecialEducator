import React, { useState } from 'react';
import { Segment, Grid, Button, Input, Dropdown, Select } from 'semantic-ui-react';

import areaCodes from '../Options/AreaCodes';
import states from '../Options/States';
import CenterFormValidation from '../Validations/CenterFormValidation';
import axiosInstance from '../serverConnection/axios';
import { authHeader } from '../serverConnection/authHeader';
import OpenPortal from '../HelpPages/OpenPortal';
import { useNavigate } from 'react-router';

function ChangeCenterData(props) {

    const [centerData, setCenterData] = useState(props.center);
    const [errorMessages, setErrorMessages] = useState({});
    const [hasError, setHasError] = useState(false);
    const [openPortal, setOpenPortal] = useState(false);
    const [portalMessage, setPortalMessage] = useState('');
    const navigate = useNavigate();

    const validationErrorComponents = Object.values(errorMessages).map((errorMessage, index) =>
        <div style={{ color: 'red' }} key={index}>{errorMessage}</div>)


    function onInputChange(e, { name }) {
        e.preventDefault();
        var centerChange = centerData;
        let value = '';
        if (name === 'state') {
            value = e.target.innerText;
        } else {
            value = e.target.value;
        }
        centerChange[name] = value;
        setCenterData(centerChange);
    }

    function onDropdownChange(e, data) {
        e.preventDefault();
        var centerChange = centerData;
        centerChange[data.name] = data.value;
        setCenterData(centerChange);
    }

    function onClickChangeCenterData() {
        console.log(centerData);
        const { errorMessages, formIsValid } = CenterFormValidation(props.center);
        var serverErrorMessage = {};
        if (formIsValid) {
            axiosInstance.post('/admin/changeCenterData', {}, {
                headers: authHeader(),
                params: {
                    center: centerData
                }
            })
                .then((response) => {
                    if (response.data.status === 'failed') {
                        serverErrorMessage['notValid'] = response.data.message;
                        setErrorMessages(serverErrorMessage);
                        setHasError(formIsValid);
                    } else {
                        setOpenPortal(formIsValid);
                        setHasError(!formIsValid);
                        setErrorMessages(serverErrorMessage);
                        setPortalMessage(response.data.message);
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
            setErrorMessages(errorMessages);
            setHasError(!formIsValid);
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
                        <Input fluid defaultValue={centerData['name']} name='name'
                            onChange={onInputChange} />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row divided>
                    <Grid.Column>
                        <p className='userProperty'>E-mail</p>
                    </Grid.Column>
                    <Grid.Column>
                        <Input fluid defaultValue={centerData['email']} name='email'
                            onChange={onInputChange} />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row divided>
                    <Grid.Column>
                        <p className='userProperty'>Phone number</p>
                    </Grid.Column>
                    <Grid.Column>
                        <Dropdown button search placeholder='Select area code' selection options={areaCodes}
                            name='areaCode' defaultValue={centerData['areaCode']} onChange={onDropdownChange} />
                        <Input fluid
                            placeholder='658 5489 584...'
                            defaultValue={centerData['phoneNumber']}
                            name='phoneNumber'
                            onChange={onInputChange} />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row divided>
                    <Grid.Column>
                        <p className='userProperty'>Address</p>
                    </Grid.Column>
                    <Grid.Column>
                        <Input fluid defaultValue={centerData['address']} name='address'
                            onChange={onInputChange} />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row divided>
                    <Grid.Column>
                        <p className='userProperty'>Address number</p>
                    </Grid.Column>
                    <Grid.Column>
                        <Input fluid defaultValue={centerData['addressNumber']} name='addressNumber'
                            onChange={onInputChange} />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row divided>
                    <Grid.Column>
                        <p className='userProperty'>City</p>
                    </Grid.Column>
                    <Grid.Column>
                        <Input fluid defaultValue={centerData['city']} name='city'
                            onChange={onInputChange} />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row divided>
                    <Grid.Column>
                        <p className='userProperty'>State</p>
                    </Grid.Column>
                    <Grid.Column>
                        <Select fluid defaultValue={centerData['state']} name='state' options={states}
                            onChange={onInputChange} />
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
                        <Button color='orange' floated='right' onClick={onClickChangeCenterData}>Change</Button>
                    </Grid.Column>
                </Grid.Row>
                {openPortal && <OpenPortal open={openPortal} message={portalMessage} handleClose={() => setOpenPortal(!openPortal)} />}
            </Grid>
        </Segment>
    )
}

export default ChangeCenterData;
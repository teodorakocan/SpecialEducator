import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Header, Container, Segment, Input, Grid, Button } from 'semantic-ui-react';

import axiosInstance from '../serverConnection/axios';
import { authHeader } from '../serverConnection/authHeader';
import ParentValidation from '../Validations/ParenValidation';
import OpenPortal from '../HelpPages/OpenPortal';

function ParentData(props) {
    const [role, setRole] = useState();
    const [parent, setParent] = useState({});
    const [hasError, setHasError] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);
    const [openPortal, setOpenPortal] = useState(false);
    const [portalMessage, setPortalMessage] = useState();
    const navigate = useNavigate();

    const errorComponents = Object.values(errorMessages).map((errorMessage, index) =>
        <div style={{ color: 'red' }} key={index}>{errorMessage}</div>)


    useEffect(() => {
        axiosInstance.get('/authUser/getParentData', {
            headers: authHeader(),
            params: {
                childId: props.childId
            }
        })
            .then((response) => {
                if (response.data.status === 'success') {
                    setRole(response.data.role);
                    setParent(response.data.parent)
                }
            }).catch((error) => {
                if (typeof error.response === 'undefined') {
                    navigate('/notFound');
                } else if (error.response.status === 403) {
                    navigate('/notAuthenticated');
                } else {
                    navigate('/notFound');
                }
            })
    }, []);

    function handleInputChange(e, { name }) {
        e.preventDefault();
        const parentData = parent;
        parentData[name] = e.target.value;
        setParent(parentData);
    }

    function onClickChangeData() {
        const { errorValidationMessages, isValid } = ParentValidation(parent);
        if (isValid) {
            axiosInstance.post('/admin/changeParentData', {}, {
                headers: authHeader(),
                params: {
                    parentData: parent
                }
            })
                .then((response) => {
                    if (response.data.status === 'success') {
                        setOpenPortal(isValid)
                        setPortalMessage(response.data.message)
                    }
                }).catch((error) => {
                    if (typeof error.response === 'undefined') {
                        navigate('/notFound');
                    } else if (error.response.status === 403) {
                        navigate('/notAuthenticated');
                    } else {
                        navigate('/notFound');
                    }
                })
            
        } else {
            setHasError(!isValid);
            setErrorMessages(errorValidationMessages);
        }
    }

    return (
        <Container>
            <Segment raised color='orange'>
                <Header as='h1' icon textAlign='center'>
                    <Header.Content style={{ color: 'orange', fontSize: '36px' }}>Parent data</Header.Content>
                </Header>

                <Grid columns={3} divided>
                    <Grid.Row stretched>
                        <Grid.Column>
                            <Segment basic textAlign='right'>Name</Segment>
                            <Segment basic textAlign='right'>Last name</Segment>
                            <Segment basic textAlign='right'>Email</Segment>
                            <Segment basic textAlign='right'>Area code</Segment>
                            <Segment basic textAlign='right'>Phone number</Segment>
                        </Grid.Column>
                        {role === 'admin' ? <Grid.Column>
                            <Input required name='name' defaultValue={parent.name} onChange={handleInputChange} />
                            <Input required name='lastName' defaultValue={parent.lastName} onChange={handleInputChange} />
                            <Input required name='email' defaultValue={parent.email} onChange={handleInputChange} />
                            <Input required name='areaCode' defaultValue={parent.areaCode} onChange={handleInputChange} />
                            <Input required name='phoneNumber' defaultValue={parent.phoneNumber} onChange={handleInputChange} />
                        </Grid.Column> :
                            <Grid.Column>
                                <Segment basic textAlign='center' style={{ fontSize: '18px' }}>{parent.name}</Segment>
                                <Segment basic textAlign='center' style={{ fontSize: '18px' }}>{parent.lastName}</Segment>
                                <Segment basic textAlign='center' style={{ fontSize: '18px' }}>{parent.email}</Segment>
                                <Segment basic textAlign='center' style={{ fontSize: '18px' }}>{parent.areaCode}</Segment>
                                <Segment basic textAlign='center' style={{ fontSize: '18px' }}>{parent.phoneNumber}</Segment>
                            </Grid.Column>
                        }

                    </Grid.Row>
                </Grid>

                {role === 'admin' &&
                    <Grid columns='two'>
                        <Grid.Row textAlign='center'>
                            <Grid.Column width={10}>
                                {hasError && errorComponents}
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <Button inverted floated='left' color='orange' onClick={onClickChangeData}>
                                    Change data
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                }
            </Segment>
            {openPortal && <OpenPortal open={openPortal} message={portalMessage} handleClose={() => setOpenPortal(!openPortal)} />}
        </Container>
    )
}

export default ParentData;
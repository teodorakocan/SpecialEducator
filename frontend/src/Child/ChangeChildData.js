import React, { useEffect, useState } from 'react';
import { Header, Container, Segment, Form, Grid, Button, Image, Icon } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { DateInput } from 'semantic-ui-calendar-react-17';
import { InputFile } from 'semantic-ui-react-input-file';
import { useNavigate } from 'react-router';

import axiosInstance from '../serverConnection/axios';
import { authHeader } from '../serverConnection/authHeader';
import ChildValidation from '../Validations/ChildValidation';
import OpenPortal from '../HelpPages/OpenPortal';

function ChangeChildData() {
    const { id } = useParams();
    const [childData, setChildaData] = useState({});
    const [hasError, setHasError] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);
    const [openPortal, setOpenPortal] = useState(false);
    const [portalMessage, setPortalMessage] = useState();
    const [date, setDate] = useState();

    const navigate = useNavigate();

    const errorComponents = Object.values(errorMessages).map((errorMessage, index) =>
        <div style={{ color: 'red' }} key={index}>{errorMessage}</div>)

    useEffect(() => {
        axiosInstance.get('/authUser/getChildData', {
            headers: authHeader(),
            params: {
                childId: id
            }
        })
            .then((response) => {
                if (response.data.status === 'success') {
                    setChildaData(response.data.child[0]);
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
    }, [id])

    function handleChildInputChange(e, { name, value }) {
        e.preventDefault();
        var inputValue = ''
        var child = childData
        if (name === 'dateOfBirth') {
            inputValue = value;
            setDate(value)
        } else {
            inputValue = e.target.value
        }
        child[name] = inputValue;
        setChildaData(child);
    }

    function onClickChangeData() {
        const { errorValidationMessages, isValid } = ChildValidation(childData);

        if (isValid) {
            axiosInstance.post('/authUser/changeChildData', {}, {
                headers: authHeader(),
                params: {
                    childId: id,
                    child: childData
                }
            })
                .then((response) => {
                    if (response.data.status === 'success') {
                        setOpenPortal(true);
                        setPortalMessage(response.data.message);
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
        <Container style={{ padding: '15px' }}>
            <Segment raised color='orange'>
                <Header as='h1' icon textAlign='center'>
                    <Header.Content style={{color: 'orange', fontSize: '36px'}}>Personal child data</Header.Content>
                </Header>
                <Form>
                    <Form.Group>
                        <Form.Input required label='First name' width={6}
                            name='name' defaultValue={childData.name} onChange={handleChildInputChange} />
                        <Form.Input required label='Last name' width={6}
                            name='lastName' defaultValue={childData.lastName} onChange={handleChildInputChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input required label='Weight' width={6}
                            name='weight' defaultValue={childData.weight} onChange={handleChildInputChange} />
                        <Form.Input required label='Height' width={6}
                            name='height' defaultValue={childData.height} onChange={handleChildInputChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input required label='Category' width={6}
                            name='category' defaultValue={childData.category} onChange={handleChildInputChange} />
                        <Form.Input required label='Degree of disability' width={6}
                            name='degreeOfDisability' defaultValue={childData.degreeOfDisability} onChange={handleChildInputChange} />
                    </Form.Group>
                    <DateInput
                        required
                        width={6}
                        dateFormat='YYYY-MM-DD'
                        name='dateOfBirth'
                        label='Date of birth'
                        iconPosition='left'
                        maxDate={new Date()}
                        value={childData.dateofBirth ? new Date(childData.dateofBirth) : ' '}
                        onChange={handleChildInputChange}
                    />
                </Form>

                <Grid columns='equal' style={{ padding: '10px' }}>
                    <Grid.Row>
                        <Grid.Column>
                            <InputFile
                                action={<Button basic><Icon name='file' /></Button>}
                                input={{
                                    id: 'input-control-id'
                                }}
                            />
                        </Grid.Column>
                        <Grid.Column>
                            <Image src={'http://localhost:9000/' + childData.image} style={{
                                width: 400,
                                height: 400
                            }} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                {hasError && errorComponents}
                <br />
                <Grid columns='equal'>
                    <Grid.Column>
                        <Button inverted floated='left' color='orange' onClick={onClickChangeData}>
                            Change data
                        </Button>
                    </Grid.Column>
                </Grid>
            </Segment>
            {openPortal && <OpenPortal open={openPortal} message={portalMessage} handleClose={() => setOpenPortal(!openPortal)} />}
        </Container>
    )
}

export default ChangeChildData;
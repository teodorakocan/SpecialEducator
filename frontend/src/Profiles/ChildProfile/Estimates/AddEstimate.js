import React, { useEffect, useState } from 'react';
import { Header, Image, Segment, TextArea, Grid, Popup, Form, Rating, Message } from 'semantic-ui-react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';

import logo from '../../../images/main_logo.png';
import OpenPortal from '../../../HelpPages/OpenPortal';
import axiosInstance from '../../../serverConnection/axios';
import { authHeader } from '../../../serverConnection/authHeader';
import './EstimateStyle.css';

function AddEstimate() {

    const { id } = useParams();
    const [estimate, setEstimate] = useState({});
    const [openPortal, setOpenPortal] = useState(false);
    const [portalMessage, setPortalMessage] = useState('');
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    function handleInputChange(e, { name }) {
        e.preventDefault();
        var estim = estimate;
        estim[name] = e.target.value;
        setEstimate(estim);
    }

    function handleMarkChange(e, { rating, name }) {
        e.preventDefault();
        var estim = estimate;
        estim[name] = rating;
        setEstimate(estim);
        setHasError(false);
    }

    function checkMarks() {
        var marksAreValid = true;
        if (!estimate['grossMotorSkilsMark'] || !estimate['fineMotorSkilsMark'] || !estimate['perceptualAbilitiesMark'] ||
            !estimate['speakingSkilsMark'] || !estimate['socioEmotionalDevelopmentMark'] || !estimate['intellectualAbilityMark']) {
            marksAreValid = false;
        }
        return marksAreValid;
    }

    function onClickAddEstimate(e) {
        e.preventDefault();
        if (checkMarks()) {
            axiosInstance.post('/admin/saveAndSendEstimate', {}, {
                headers: authHeader(),
                params: {
                    estimate: estimate,
                    childId: id
                }
            }).then((response) => {
                if (response.data.status === 'success') {
                    setOpenPortal(true);
                    setPortalMessage('Estimate is saved and sent to parent.');
                    e.target.reset();
                } else {
                    setOpenPortal(true);
                    setPortalMessage('Estimate for this month is already added.');
                }
            }).catch((err) => {
                throwError(err);
            });
        } else {
            setHasError(true);
            setErrorMessage('You have to rate all progresses.')
        }
    }

    function throwError(error) {
        if (typeof error.response === 'undefined') {
            navigate('/notFound');
        } else if (error.response.status === 403) {
            navigate('/notAuthenticated');
        } else if (error.response.status === 401) {
            navigate('/notAuthorized');
        } else {
            navigate('/notFound');
        }
    }

    return (
        <Grid.Column width={10}>
            <Segment raised color='orange'>
                <Header as='h1' icon textAlign='center'>
                    <Image circular src={logo} />
                    <p className='title'>Estimate</p>
                </Header>

                <Form onSubmit={onClickAddEstimate}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Field>
                                    <p className='properties'>
                                        Gross motor skils</p>
                                    <TextArea placeholder='Describe...' style={{ minHeight: 100 }} name='grossMotorSkils'
                                        onChange={handleInputChange} />
                                    <div>Assess gross motor skils:</div>
                                    <Rating maxRating={5} icon='star' name='grossMotorSkilsMark'
                                        onRate={handleMarkChange} />
                                </Form.Field>

                                <Form.Field>
                                    <p className='properties'>
                                        Fine motor skils</p>
                                    <TextArea placeholder='Describe...' style={{ minHeight: 100 }} name='fineMotorSkils'
                                        onChange={handleInputChange} />
                                    <div>Assess fine motor skils:</div>
                                    <Rating maxRating={5} icon='star' name='fineMotorSkilsMark'
                                        onRate={handleMarkChange} />
                                </Form.Field>

                                <Form.Field>
                                    <p className='properties'>
                                        Perceptual abilities</p>
                                    <TextArea placeholder='Describe...' style={{ minHeight: 100 }} name='perceptualAbilities'
                                        onChange={handleInputChange} />
                                    <div>Assess perceptual abilities:</div>
                                    <Rating maxRating={5} icon='star' name='perceptualAbilitiesMark'
                                        onRate={handleMarkChange} />
                                </Form.Field>

                                <Form.Field>
                                    <p className='properties'>
                                        Speaking skils</p>
                                    <TextArea placeholder='Describe...' style={{ minHeight: 100 }} name='speakingSkils'
                                        onChange={handleInputChange} />
                                    <div>Assess speaking skils:</div>
                                    <Rating maxRating={5} icon='star' name='speakingSkilsMark'
                                        onRate={handleMarkChange} />
                                </Form.Field>

                                <Form.Field>
                                    <p className='properties'>
                                        Socio emotional development</p>
                                    <TextArea placeholder='Describe...' style={{ minHeight: 100 }} name='socioEmotionalDevelopment'
                                        onChange={handleInputChange} />
                                    <div>Assess socio emotional development:</div>
                                    <Rating maxRating={5} icon='star' name='socioEmotionalDevelopmentMark'
                                        onRate={handleMarkChange} />
                                </Form.Field>

                                <Form.Field>
                                    <p className='properties'>
                                        Intellectual ability</p>
                                    <TextArea placeholder='Describe...' style={{ minHeight: 100 }} name='intellectualAbility'
                                        onChange={handleInputChange} />
                                    <div>Assess intellectual ability:</div>
                                    <Rating maxRating={5} icon='star' name='intellectualAbilityMark'
                                        onRate={handleMarkChange} />
                                </Form.Field>

                            </Grid.Column>
                        </Grid.Row>

                        {hasError && <div style={{ color: 'red' }}>{errorMessage}</div>}

                        <Grid.Row>
                            <Grid.Column>
                                <Popup position='right center' content='Save estimate and send it to parent' trigger={
                                    <Form.Button
                                        inverted
                                        color='orange'
                                        floated='right'>
                                        Save estimate
                                    </Form.Button>
                                } />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
            </Segment>
            {openPortal && <OpenPortal open={openPortal} message={portalMessage} handleClose={() => setOpenPortal(!openPortal)} />}
        </Grid.Column>
    )
}

export default AddEstimate;
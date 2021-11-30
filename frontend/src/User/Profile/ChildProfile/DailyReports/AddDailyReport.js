import React, { useState } from 'react';
import { Header, Image, Segment, TextArea, Grid, Popup, Form, Rating, Message } from 'semantic-ui-react';
import { useNavigate } from 'react-router';

import logo from '../../../../images/main_logo.png';
import axiosInstance from '../../../../serverConnection/axios';
import { authHeader } from '../../../../serverConnection/authHeader';
import OpenPortal from '../../../../HelpPages/OpenPortal';
import useDailyReportExits from '../../../../hooks/useDailyReportExits';
import useChildData from '../../../../hooks/useChildData';

function AddDailyReport(props) {

    const [child, appointments] = useChildData(props.childId);
    const [dailyReport, setDailyReport] = useState({});
    const [openPortal, setOpenPortal] = useState(false);
    const [portalMessage, setPortalMessage] = useState('');
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [exist, message] = useDailyReportExits(props.childId);
    const navigate = useNavigate();

    const childName = Object.values(child).map((kid, index) =>
        <Header.Content key={index}>Daily report for  {kid.name}</Header.Content>
    )

    function handleInputChange(e, { rating, name }) {
        e.preventDefault();
        var report = dailyReport;
        if (name === 'mark') {
            report[name] = rating;
        } else {
            report[name] = e.target.value;
        }
        setDailyReport(report);
    }

    function CheckMark() {
        if (!dailyReport['mark']) {
            setHasError(true);
            const message = 'You need to mark child appointment.';
            setErrorMessage(message);
            return false;
        } else {
            setHasError(false);
            return true;
        }
    }

    function onClickSendAndSaveReport(e) {
        e.preventDefault();
        if (CheckMark()) {
            axiosInstance.post('/authUser/sendAndSaveDailyReport', {}, {
                headers: authHeader(),
                params: {
                    report: dailyReport,
                    childId: props.childId
                }
            }).then((response) => {
                if (response.data.status === 'success') {
                    setOpenPortal(true);
                    setPortalMessage('Daily report is saved and sent to parent.');
                    e.target.reset();
                } else {
                    setOpenPortal(true);
                    setPortalMessage('Daily report for this day is already added.');
                }
            }).catch((err) => {
                throwError(err);
            });
        }
    }

    function throwError(error) {
        if (typeof error.response === 'undefined') {
            navigate('/notFound');
        } else if (error.response.status === 403) {
            navigate('/notAuthenticated');
        } else {
            navigate('/notFound');
        }
    }

    return (
        exist ? <Grid.Row>
            <Message
                warning
                header={message}
                content='Adding new daily report will be available tomorrow or delete last one report to add new one.'
            />
        </Grid.Row > :
            < Grid.Row >
                <Grid.Column width={10}>
                    <Segment raised color='orange'>
                        <Header as='h1' icon textAlign='center'>
                            <Image circular src={logo} />
                            {childName}
                        </Header>

                        <Form onSubmit={onClickSendAndSaveReport}>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Form.Field>
                                            <p style={{ fontSize: '14px', fontFamily: 'Verdana, Arial, Helvetica, sans-serif' }}>
                                                Report</p>
                                            <TextArea placeholder='Additional information...' style={{ minHeight: 100 }} name='report'
                                                onChange={handleInputChange} />
                                        </Form.Field>

                                        <Form.Field>
                                            <p style={{ fontSize: '14px', fontFamily: 'Verdana, Arial, Helvetica, sans-serif' }}>
                                                Recommendation for teacher</p>
                                            <TextArea placeholder='Write recommentation...' style={{ minHeight: 100 }} name='recommendationForTeacher'
                                                onChange={handleInputChange} />
                                        </Form.Field>

                                        <Form.Field>
                                            <p style={{ fontSize: '14px', fontFamily: 'Verdana, Arial, Helvetica, sans-serif' }}>
                                                Recommendation for parent</p>
                                            <TextArea placeholder='Write recommentation...' style={{ minHeight: 100 }} name='recommendationForParent'
                                                onChange={handleInputChange} />
                                        </Form.Field>

                                        <Form.Field>
                                            <p style={{ fontSize: '14px', fontFamily: 'Verdana, Arial, Helvetica, sans-serif' }}>
                                                Progress</p>
                                            <TextArea placeholder='Desribe progress...' style={{ minHeight: 100 }} name='progress'
                                                onChange={handleInputChange} />
                                        </Form.Field>

                                        <Form.Field>
                                            <p style={{ fontSize: '14px', fontFamily: 'Verdana, Arial, Helvetica, sans-serif' }}>
                                                Problems</p>
                                            <TextArea placeholder='Desribe problems...' style={{ minHeight: 100 }} name='problems'
                                                onChange={handleInputChange} />
                                        </Form.Field>

                                        <Form.Field>
                                            <p style={{ fontSize: '14px', fontFamily: 'Verdana, Arial, Helvetica, sans-serif' }}>
                                                Give child a mark for his appointment:
                                            </p>
                                            <Rating maxRating={5} defaultRating={3} icon='star' size='massive' name='mark'
                                                onRate={handleInputChange} />
                                        </Form.Field>
                                    </Grid.Column>
                                </Grid.Row>

                                {hasError && <div style={{ color: 'red' }}>{errorMessage}</div>}

                                <Grid.Row>
                                    <Grid.Column>
                                        <Popup position='right center' content='Save report and send it to parent' trigger={
                                            <Form.Button
                                                inverted
                                                color='orange'
                                                floated='right'>
                                                Save report
                                            </Form.Button>
                                        } />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Form>
                    </Segment>
                </Grid.Column>
                {openPortal && <OpenPortal open={openPortal} message={portalMessage} handleClose={() => setOpenPortal(!openPortal)} />}
            </Grid.Row >
    )
}

export default AddDailyReport;
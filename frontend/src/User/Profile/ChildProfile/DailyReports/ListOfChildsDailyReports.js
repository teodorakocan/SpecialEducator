import React, { useEffect, useState } from 'react';
import { List, Grid, Button, Checkbox, Message, Icon, Popup, Segment, Input } from 'semantic-ui-react';
import { useNavigate } from 'react-router';

import axiosInstance from '../../../../serverConnection/axios';
import { authHeader } from '../../../../serverConnection/authHeader';
import OpenPortal from '../../../../HelpPages/OpenPortal';

function ListOfChildsDailyReports(props) {

    const [childsReports, setChildsReports] = useState([]);
    const [listIsChanged, setListIsChanged] = useState(false);
    const [checkedReports, setCheckedReports] = useState([]);
    const [openPortal, setOpenPortal] = useState(false);
    const [portalMessage, setPortalMessage] = useState();
    const [searchDate, setSearchDate] = useState();
    const navigate = useNavigate();

    const dailyReportContent = Object.values(childsReports).map((childsReport, index) =>
        <List.Item key={index}>
            <List.Content floated='right'>
                <Popup content='Delete daily report' trigger={
                    <Button
                        icon
                        inverted
                        color='red'
                        onClick={() => onClickDeleteDailyReport(childsReport.id)}>
                        <Icon name='trash' />
                    </Button>} />
            </List.Content>
            <List.Content floated='left'>
                <Checkbox
                    name='checkboxDailyReport'
                    value={childsReport.id}
                    onChange={handleOnChange}
                />
            </List.Content>
            <List.Content>
                <List.Item href={'/dailyReport/' + childsReport.id}>Daily report for {childsReport.date}</List.Item>
            </List.Content>
        </List.Item>
    );

    useEffect(async () => {
        axiosInstance.get('/authUser/listOfChildsDailyReports', {
            headers: authHeader(),
            params: {
                childId: props.childId
            }
        })
            .then((response) => {
                if (response.data.status === 'success') {
                    var dailyReports = [];
                    response.data.childsDailyReports.forEach(report => {
                        var dateOfAdding = report.date.split('T');

                        var reportsInfo = {};
                        reportsInfo['id'] = report.idDailyReport;
                        reportsInfo['date'] = dateOfAdding[0];

                        dailyReports.push(reportsInfo);
                    });
                    setChildsReports(dailyReports);
                }
            }).catch((error) => {
                throwError(error);
            });

        setListIsChanged(false);
    }, [listIsChanged])

    function throwError(error) {
        if (typeof error.response === 'undefined') {
            navigate('/notFound');
        } else if (error.response.status === 403) {
            navigate('/notAuthenticated');
        } else {
            navigate('/notFound');
        }
    }

    function handleOnChange(e, { value }) {
        e.preventDefault();
        if (checkedReports.find(item => item === value)) {
            const index = checkedReports.indexOf(value);
            checkedReports.splice(index, value);
        } else {
            checkedReports.push(value);
        }
    }

    function onClickDeleteDailyReport(reportId) {
        axiosInstance.post('/authUser/deleteDailyReport', {}, {
            headers: authHeader(),
            params: {
                reportId: reportId
            }
        })
            .then((response) => {
                if (response.data.status === 'success') {
                    setListIsChanged(true);
                    setOpenPortal(true);
                    setPortalMessage('Daily report is deleted');
                }
            }).catch((error) => {
                throwError(error);
            })
    }

    function onClickDeleteMarkedReports() {
        axiosInstance.post('/authUser/deleteMarkedDailyReports', {}, {
            headers: authHeader(),
            params: {
                reports: checkedReports
            }
        })
            .then((response) => {
                if (response.data.status === 'success') {
                    setListIsChanged(true);
                    setOpenPortal(true);
                    setPortalMessage('Daily report is deleted');
                }
            }).catch((error) => {
                throwError(error);
            })
    }

    function handleSearch(e) {
        e.preventDefault();
        setSearchDate(e.target.value);
    }

    function onClickSerachDailyReport() {
        if (searchDate) {
            axiosInstance.get('/authUser/searchDailyReport', {
                headers: authHeader(),
                params: {
                    date: searchDate
                }
            })
                .then((response) => {
                    if (response.data.status === 'success') {
                        setChildsReports(response.data.dailyReport);
                    }
                }).catch((error) => {
                    throwError(error);
                })
        } else {
            setListIsChanged(true);
        }
    }

    function onClickRefreshList() {
        setListIsChanged(true);
    }

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width={16}>
                    <Segment>
                        <Input placeholder='Search...' type='date' onChange={handleSearch} />

                        <Button icon inverted color='orange' floated='right' onClick={onClickRefreshList}>
                            <Icon name='refresh' />
                        </Button>

                        <Button icon inverted color='orange' floated='right' onClick={onClickSerachDailyReport}>
                            <Icon name='search' />
                        </Button>
                    </Segment>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                {childsReports.length === 0 ?
                    <Grid.Column width={16}>
                        <Message
                            warning
                            header='List is empty'
                            content='No daily report was added.'
                        />
                    </Grid.Column > :
                    <Grid.Column width={16}>
                        <List divided verticalAlign='middle'>
                            {dailyReportContent}
                        </List>
                        {checkedReports.length === 0 ? '' :
                            <Button inverted color='red' onClick={onClickDeleteMarkedReports}>Delete marked</Button>}
                    </Grid.Column>}
            </Grid.Row>
            {openPortal && <OpenPortal open={openPortal} message={portalMessage} handleClose={() => setOpenPortal(!openPortal)} />}
        </Grid>
    )
}
export default ListOfChildsDailyReports;
import React, { useEffect, useState } from 'react';
import { List, Grid, Button, Checkbox, Message, Icon, Popup } from 'semantic-ui-react';
import { useNavigate } from 'react-router';

import axiosInstance from '../../../../serverConnection/axios';
import { authHeader } from '../../../../serverConnection/authHeader';
import useChildData from '../../../../hooks/useChildData';

function ListOfDailyReports(props) {

    const [childsReports, setChildsReports] = useState([]);
    const [listIsChanged, setListIsChanged] = useState(false);
    const [checkedReports, setCheckedReports] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
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
            <Checkbox
                label={'Daily report for ' + childsReport.date}
                name='checkboxDailyReport'
                value={childsReport.id}
                onChange={handleOnChange}
            />
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

        if (checkedReports.length == 0) {
            setIsChecked(false);
        } else {
            setIsChecked(true);
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
                debugger
                if (response.data.status === 'success') {
                    setListIsChanged(true);
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
                }
            }).catch((error) => {
                throwError(error);
            })
    }

    return (
        childsReports.length === 0 ?
            <Grid.Row>
                <Message
                    warning
                    header='List is empty'
                    content='No daily report was added.'
                />
            </Grid.Row > :
            < Grid.Row >
                <Grid.Column width={10}>
                    <List divided verticalAlign='middle'>
                        {dailyReportContent}
                    </List>

                    {isChecked ?
                        <Button inverted color='red' onClick={onClickDeleteMarkedReports}>Delete marked</Button>
                        : ''}
                </Grid.Column>
            </Grid.Row>
    )
}
export default ListOfDailyReports;
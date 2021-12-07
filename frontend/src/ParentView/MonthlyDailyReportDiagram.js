import React, { useState, useEffect } from 'react';
import { Chart, Series, ArgumentAxis, Legend, Label, Tooltip, Export } from 'devextreme-react/chart';
import { Container } from 'semantic-ui-react';

import axiosInstance from '../serverConnection/axios';
import { authHeader } from '../serverConnection/authHeader';

function MonthlyDailyReportDiagram() {

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const childId = params.get('childId');
    const [grades, setGrades] = useState([]);

    useEffect(() => {
        axiosInstance.get('/user/diagramMonthlyDailyReport', {
            headers: authHeader(),
            params: {
                childId: childId
            }
        })
            .then((response) => {
                if (response.data.status === 'success') {
                    var allGrades = [];
                    response.data.dailyReports.forEach(mark => {
                        var dailyReportDateAndTime = mark.date.split('T');
                        var dailyReportDate = dailyReportDateAndTime[0].split('-');

                        var gradesInfo = {};
                        gradesInfo['date'] = dailyReportDate[2] + '.' + dailyReportDate[1] + '.' + dailyReportDate[0];
                        gradesInfo['val'] = mark.mark;
                        allGrades.push(gradesInfo);
                    });
                    setGrades(allGrades);
                }
            });
    }, [childId]);

    console.log(grades);
    return (
        <Container style={{ padding: '15px' }}>
            <React.Fragment>
                <Chart
                    dataSource={grades}
                    palette='Violet'
                    title='Diagram based on daily reports for the month'
                >
                    <Series argumentField='date' />
                    <ArgumentAxis>
                        <Label
                            wordWrap='none'
                            overlappingBehavior='rotate'
                        />
                    </ArgumentAxis>
                    <Legend visible={false} />
                    <Tooltip enabled={true} />
                    <Export enabled={true} />
                </Chart>
            </React.Fragment>
        </Container>
    )
}

export default MonthlyDailyReportDiagram;
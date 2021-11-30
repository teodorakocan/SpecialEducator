import React, { useEffect, useState } from 'react';
import { Chart, Series, ArgumentAxis, Legend, Label, Tooltip, Export } from 'devextreme-react/chart';
import { useParams } from 'react-router-dom';

import axiosInstance from "../../../../serverConnection/axios";
import { authHeader } from "../../../../serverConnection/authHeader";

function DailyReportDiagram() {

    const { id } = useParams();
    const [grades, setGrades] = useState([])

    useEffect(() => {
        axiosInstance.get('/authUser/getGradesOfDailyReports', {
            headers: authHeader(),
            params: {
                childId: id
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
    }, [id])

    return (
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
    )
}

export default DailyReportDiagram;
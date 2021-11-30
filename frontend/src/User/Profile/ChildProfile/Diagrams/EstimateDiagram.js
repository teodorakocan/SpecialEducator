import React, { useEffect, useState } from 'react';
import { Chart, Series, ArgumentAxis, Legend, Label, Tooltip, CommonSeriesSettings, Export } from 'devextreme-react/chart';
import { useParams } from 'react-router-dom';

import axiosInstance from '../../../../serverConnection/axios';
import { authHeader } from '../../../../serverConnection/authHeader';
import { categoryOfGrades } from './estimateData';


function EstimateDigram() {

    const { id } = useParams();
    const [grades, setGrades] = useState([]);

    useEffect(() => {
        axiosInstance.get('/authUser/getGradesOfEstimates', {
            headers: authHeader(),
            params: {
                childId: id
            }
        })
            .then((response) => {
                if (response.data.status === 'success') {
                    var allGrades = [];
                    response.data.estimates.forEach(estimate => {
                        var estimateDateAndTime = estimate.date.split('T');
                        var estimateDate = estimateDateAndTime[0].split('-');

                        var gradesInfo = {};
                        gradesInfo['date'] = estimateDate[2] + '.' + estimateDate[1] + '.' + estimateDate[0];
                        gradesInfo['grossMotorSkilsMark'] = estimate.grossMotorSkilsMark;
                        gradesInfo['fineMotorSkilsMark'] = estimate.fineMotorSkilsMark;
                        gradesInfo['perceptualAbilitiesMark'] = estimate.perceptualAbilitiesMark;
                        gradesInfo['speakingSkilsMark'] = estimate.speakingSkilsMark;
                        gradesInfo['socioEmotionalDevelopmentMark'] = estimate.socioEmotionalDevelopmentMark;
                        gradesInfo['intellectualAbilityMark'] = estimate.intellectualAbilityMark;
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
                <CommonSeriesSettings
                    argumentField='date'
                    type='line'
                />
                {
                    categoryOfGrades.map((item) => <Series
                        key={item.value}
                        valueField={item.value}
                        name={item.name} />)
                }
                <ArgumentAxis>
                    <Label
                        wordWrap='none'
                        overlappingBehavior='rotate'
                    />
                </ArgumentAxis>
                <Legend
                    verticalAlignment="bottom"
                    horizontalAlignment="center"
                    itemTextPosition="bottom"
                />
                <Tooltip enabled={true} />
                <Export enabled={true} />
            </Chart>
        </React.Fragment>
    )
}

export default EstimateDigram;
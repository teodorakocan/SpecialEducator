import React from 'react';
import { useParams } from 'react-router-dom';
import useGetDailyReportById from '../../../../hooks/useGetDailyReportById';

function DailyReport() {
    const { id } = useParams();
    const dailyReport = useGetDailyReportById(id);
    console.log(dailyReport);
    return (
        <div> {id}</div>
    )
}

export default DailyReport;
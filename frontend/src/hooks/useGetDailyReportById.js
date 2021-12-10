import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import axiosInstance from '../serverConnection/axios';
import { authHeader } from '../serverConnection/authHeader';

const useGetDailyReportById = (dailyReportId) => {
    const [dailyReport, setDailyReport] = useState([]);
    const [date, setDate] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        getDailyReportById();
    }, [dailyReportId]);

    function getDailyReportById () {
        axiosInstance.get('/authUser/getDailyReportById', {
            headers: authHeader(),
            params:{
                dailyReportId: dailyReportId
            }
        })
            .then((response) => {
                debugger
                if (response.data.status === 'success') {
                    var dailyReportDateAndTime = response.data.dailyReport[0].date.split('T');
                    var dailyReportDate = dailyReportDateAndTime[0].split('-');

                    setDate(dailyReportDate[2] + '.' + dailyReportDate[1] + '.' + dailyReportDate[0]);
                    setDailyReport(response.data.dailyReport);
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
    }

    return [dailyReport, date];
}

export default useGetDailyReportById;
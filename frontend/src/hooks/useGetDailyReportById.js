import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import axiosInstance from '../serverConnection/axios';
import { authHeader } from '../serverConnection/authHeader';

const useGetDailyReportById = (dailyReportId) => {
    const [dailyReport, setDailyReport] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getDailyReportById();
    }, [dailyReportId]);

    const getDailyReportById = async () => {
        axiosInstance.get('/authUser/getDailyReportById', {
            headers: authHeader(),
            params:{
                dailyReportId: dailyReportId
            }
        })
            .then((response) => {
                if (response.data.status === 'success') {
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

    return dailyReport;
}

export default useGetDailyReportById;
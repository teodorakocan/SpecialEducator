import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import axiosInstance from '../serverConnection/axios';
import { authHeader } from '../serverConnection/authHeader';

const useGetEstimateById = (estimateId) => {
    const [estimate, setEstimate] = useState([]);
    const [date, setDate] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        getEstimateById();
    }, [estimateId]);

    const getEstimateById = async () => {
        axiosInstance.get('/authUser/getEstimateById', {
            headers: authHeader(),
            params:{
                estimateId: estimateId
            }
        })
            .then((response) => {
                if (response.data.status === 'success') {
                    var estimateDateAndTime = response.data.estimate[0].date.split('T');
                    var estimateDate = estimateDateAndTime[0].split('-');

                    setDate(estimateDate[2] + '.' + estimateDate[1] + '.' + estimateDate[0]);
                    setEstimate(response.data.estimate);
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

    return [estimate, date];
}

export default useGetEstimateById;
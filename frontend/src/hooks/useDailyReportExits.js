import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import axiosInstance from '../serverConnection/axios';
import { authHeader } from '../serverConnection/authHeader';

const useDailyReportExits = (childId) => {
    const [exist, setExist] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        checkIfDailyReportAllreadyExist();
    }, [childId]);

    const checkIfDailyReportAllreadyExist = async () => {
        axiosInstance.get('/authUser/checkIfDailyReportAllreadyExist', {
            headers: authHeader(),
            params: {
                childId: childId
            }
        })
            .then((response) => {
                if (response.data.status === 'success') {
                    setExist(true);
                    setMessage(response.data.message);
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

    return [exist, message];
}

export default useDailyReportExits;
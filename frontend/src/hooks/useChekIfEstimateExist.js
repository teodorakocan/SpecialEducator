import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import axiosInstance from '../serverConnection/axios';
import { authHeader } from '../serverConnection/authHeader';

const useChekIfEstimateExist = (childId) => {
    const [exist, setExist] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        checkIfEstimateAllreadyExist();
    }, [childId]);

    function checkIfEstimateAllreadyExist () {
        axiosInstance.get('/admin/checkIfEstimateAllreadyExist', {
            headers: authHeader()
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
                } else if (error.response.status === 401) {
                    navigate('/notAuthorized');
                }else {
                    navigate('/notFound');
                }
            })
    }

    return [exist, message];
}

export default useChekIfEstimateExist;
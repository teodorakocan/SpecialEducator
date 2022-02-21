import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import axiosInstance from '../serverConnection/axios';
import { authHeader } from '../serverConnection/authHeader';

const useCheckIfEstimateExist = (id) => {

    const [estimateExist, setEstimateExist] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        checkIfItIsTimeForEstimate();
    }, [id]);

    function checkIfItIsTimeForEstimate() {
        axiosInstance.get('/admin/checkIfEstimateExist', {
            headers: authHeader(),
            params: {
                childId: id
            }
        })
            .then((response) => {
                if (response.data.status === 'exist') {
                    setEstimateExist(true);
                } else {
                    setEstimateExist(false);
                }
            }).catch((error) => {
                console.log(error);
                if (typeof error.response === 'undefined') {
                    navigate('/notFound');
                } else if (error.response.status === 403) {
                    navigate('/notAuthenticated');
                } else {
                    navigate('/notFound');
                }
            });
    }

    return estimateExist;
}

export default useCheckIfEstimateExist;
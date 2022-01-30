import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import axiosInstance from '../serverConnection/axios';
import { authHeader } from '../serverConnection/authHeader';

const useCheckIfItIsTimeForFirstEstimate = (teacherRole, id) =>{

    const [timeForFirstEstimate, setTimeForFirstEstimete] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        checkIfItIsTimeForFirstEstimate();
    }, [teacherRole]);

    function checkIfItIsTimeForFirstEstimate () {
        axiosInstance.get('/authUser/checkIfItIsTimeForFirstEstimate', {
            headers: authHeader(),
            params: {
                childId: id
            }
        })
            .then((response) => {
                if (response.data.status === 'success' && teacherRole === 'admin') {
                    setTimeForFirstEstimete(true);
                }else{
                    setTimeForFirstEstimete(false);
                }
            }).catch((error) => {
                console.log(error);
                if(typeof error.response === 'undefined'){
                    navigate('/notFound');
                }else if (error.response.status === 403) {
                    navigate('/notAuthenticated');
                } else {
                    navigate('/notFound');
                }
            })
    }

    return timeForFirstEstimate;
}

export default useCheckIfItIsTimeForFirstEstimate;
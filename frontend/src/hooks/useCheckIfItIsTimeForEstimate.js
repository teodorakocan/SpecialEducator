import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import axiosInstance from '../serverConnection/axios';
import { authHeader } from '../serverConnection/authHeader';

const useCheckIfItIsTimeForEstimate = (teacherRole) =>{

    const [timeForEstimate, setTimeForEstimete] = useState(false);

    useEffect(() => {
        checkIfItIsTimeForEstimate();
    }, [teacherRole]);

    const checkIfItIsTimeForEstimate = () => {
        //proveri da li je prvi u mesecu i proveri rolu teachera
        //ako je admin i ako je prvi u mesecu posalji true ako nije nesto od to dva salji false
        var nowDateAndTime = new Date();
        let date = nowDateAndTime.getDate();
        
        if(date == 29 && teacherRole === 'admin'){
            setTimeForEstimete(true);
        }else{
            setTimeForEstimete(false);
        }
    }

    return timeForEstimate;
}

export default useCheckIfItIsTimeForEstimate;
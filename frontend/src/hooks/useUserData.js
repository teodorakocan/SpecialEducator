import { useEffect, useState } from 'react';
import { authHeader } from '../serverConnection/authHeader';
import axiosInstance from '../serverConnection/axios';

const useUserData = () => {
    const [response, setResponse] = useState([]);

    useEffect(() => {
        onChangeData();
    }, []);

    const onChangeData = async () => {
        const serverRes = await axiosInstance.get('/api/user/data', { headers: authHeader() });
        
        if (serverRes) {
            setResponse(serverRes.data);
        } /*else {
            setResponse(error.response);
        };*/
    }
    
    return { response, onChangeData }
};

export default useUserData;
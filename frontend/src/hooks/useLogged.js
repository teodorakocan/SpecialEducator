import { useEffect, useState } from 'react';
import { authHeader } from '../serverConnection/authHeader';
import axiosInstance from '../serverConnection/axios';

const useLogged = () => {
    const [isLogged, setIsLogged] = useState();

    useEffect(() => {
        check();
    });

    const check = () => {
        axiosInstance.get('/api/user/logged', { headers: authHeader() })
            .then(response => {
                if (response.data.status === 'failed') {
                    setIsLogged(false);
                } else {
                    setIsLogged(true);
                }
            });
    }

    return isLogged;
};

export default useLogged;
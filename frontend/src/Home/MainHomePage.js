import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '../serverConnection/axios';
import { authHeader } from '../serverConnection/authHeader';

const MainHomePage = () => {

    const navigate = useNavigate();
    //kad mi se vrate podaci o ulogovanom korisniku ako je response 401 vrati mi page notfound
    useEffect(() => {
        axiosInstance.get('/api/user/data', { headers: authHeader() })
            .then((resposnse) => {
                console.log(resposnse.data);
            })
            .catch((error) => {
                console.log(error.response.status);
                console.log(error.response.data.message);
                navigate(-1);
            })
    })
    return (
        <div>
            Home
        </div>
    )
};

export default MainHomePage;
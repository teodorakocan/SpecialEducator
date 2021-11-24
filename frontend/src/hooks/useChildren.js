import { useState, useEffect } from 'react';
import axiosInstance from '../serverConnection/axios';
import { authHeader } from '../serverConnection/authHeader';

const useChildren = (searchChild) =>{
    const [children, setChildren] = useState([]);

    useEffect(() => {
        search(searchChild);
    }, [searchChild]);

    const search = async (child) => {
        console.log(child);
    }

    return [children, search];
}

export default useChildren;
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:9000/",
    headers:{
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }
});

export default axiosInstance
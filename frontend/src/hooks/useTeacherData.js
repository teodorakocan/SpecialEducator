import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import axiosInstance from '../serverConnection/axios';
import { authHeader } from '../serverConnection/authHeader';

const useTeacherData = (teacherId) =>{
    const [teacher, setTeacher] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getTeacherData();
    }, [teacherId]);

    const getTeacherData = async () => {
        axiosInstance.get('/admin/getTeacherData', {
            headers: authHeader(),
            params: {
                teacherId: teacherId
            }
        }).then((response) => {
                if (response.data.status === 'success') {
                    setTeacher(response.data.teacher);
                    setAppointments(response.data.appointments);
                }
            }).catch((error) => {
                if (typeof error.response === 'undefined') {
                    navigate('/notFound');
                } else if (error.response.status === 403) {
                    navigate('/notAuthenticated');
                } else if (error.response.status === 404) {
                    navigate('/notFound');
                } else {
                    navigate('/notAuthorized');
                }
            });
    }

    return [teacher, appointments];
}

export default useTeacherData;
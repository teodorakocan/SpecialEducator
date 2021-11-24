import { useState, useEffect } from 'react';
import axiosInstance from '../serverConnection/axios';
import { authHeader } from '../serverConnection/authHeader';

const useTeacher = (teacherId) =>{
    const [teacher, setTeacher] = useState([]);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        getTeacherData();
    }, [teacherId]);

    const getTeacherData = async () => {
        axiosInstance.get('/admin/getTeacherData', {
            headers: authHeader(),
            params: {
                teacherId: teacherId
            }
        })
            .then((response) => {
                if (response.data.status === 'success') {
                    setTeacher(response.data.teacher);
                    setAppointments(response.data.appointments);
                }
            });
    }

    return [teacher, appointments];
}

export default useTeacher;
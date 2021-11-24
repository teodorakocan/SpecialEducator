import axiosInstance from '../../../serverConnection/axios';
import { authHeader } from '../../../serverConnection/authHeader';

export const teachers = getTeachers()

function getTeachers() {
    var teachers = [];
    axiosInstance.get('/admin/allUsers', { headers: authHeader() })
        .then((response) => {
            if (response.data.status === 'success') {
                response.data.users.forEach(user => {
                    teachers.push(user);
                })
            }
        });
    return teachers;
}

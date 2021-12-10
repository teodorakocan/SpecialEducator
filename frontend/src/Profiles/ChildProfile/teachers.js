import axiosInstance from '../../serverConnection/axios';
import { authHeader } from '../../serverConnection/authHeader';

export const teachers = getTeachers();

function getTeachers() {
    var teachers = [];
    axiosInstance.get('/authUser/allTeachers', { headers: authHeader() })
        .then((response) => {
            if (response.data.status === 'success') {
                response.data.users.forEach(teacher => {
                    var teacherData = {};
                    teacherData['text'] = teacher.name + ' ' + teacher.lastName;
                    teacherData['id'] = teacher.idUser;
                    teacherData['color'] = '#ff8533';
                    teacherData['avatar'] = 'http://localhost:9000/' + teacher.image;
                    teachers.push(teacherData);
                });
            }
        });
    return teachers;
}
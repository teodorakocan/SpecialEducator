import axiosInstance from '../../../serverConnection/axios';
import { authHeader } from '../../../serverConnection/authHeader';

export const teacher = getTeacher();

function getTeacher() {
    var teacher = [];
    axiosInstance.get('/authUser/userData', { headers: authHeader() })
        .then((response) => {
            if (response.data.status === 'success') {
                var user = {};
                user['text'] = response.data.user.name + ' ' + response.data.user.lastName;
                user['id'] = response.data.user.idUser;
                user['color'] = '#ff8533';
                user['avatar'] = 'http://localhost:9000/' + response.data.user.image;
                teacher.push(user);
            }
        });
    return teacher;
}
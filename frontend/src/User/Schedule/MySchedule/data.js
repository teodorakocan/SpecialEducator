import axiosInstance from '../../../serverConnection/axios';
import { authHeader } from '../../../serverConnection/authHeader';

const children = getChildren();
const teacher = getTeacher();
const schedule = getSchedule();

function getSchedule() {
    var schedule = [];
    axiosInstance.get('/authUser/mySchedule', { headers: authHeader() })
        .then((response) => {
            if (response.data.status === 'success') {
                response.data.mySchedule.forEach(item => {
                    var data = {};
                    data['text'] = item.text;
                    data['idUser'] = item.idUser;
                    data['idChild'] = item.idChild;
                    data['startDate'] = new Date(item.startDate);
                    data['endDate'] = new Date(item.endDate);
                    data['description'] = item.description;
                    schedule.push(data);
                })
            }
        });
    return schedule;
}

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

function getChildren() {
    var children = [];
    axiosInstance.get('/authUser/allChildren', { headers: authHeader() })
        .then((response) => {
            if (response.data.status === 'success') {
                response.data.children.forEach(child => {
                    var childrenInfo = {};
                    childrenInfo['text'] = child.name + ' ' + child.lastName;
                    childrenInfo['id'] = child.idChild;
                    childrenInfo['color'] = '#ff8533';
                    childrenInfo['avatar'] = 'http://localhost:9000/' + child.image;
                    children.push(childrenInfo);
                })
            }
        });
    return children;
}

export default{
    children,
    teacher,
    schedule
}

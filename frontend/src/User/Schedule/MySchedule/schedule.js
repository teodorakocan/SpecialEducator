import axiosInstance from '../../../serverConnection/axios';
import { authHeader } from '../../../serverConnection/authHeader';

export const schedule = getSchedule()

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

import axiosInstance from '../../../serverConnection/axios';
import { authHeader } from '../../../serverConnection/authHeader';

export const appointments = getSchedule()

function getSchedule() {
    var schedule = [];
    axiosInstance.get('/admin/schedule', { headers: authHeader() })
        .then((response) => {
            response.data.appointments.forEach(appointment => {
                var data = {};
                data['idAppointment'] = appointment.idAppointment;
                data['text'] = appointment.text;
                data['idUser'] = appointment.idUser;
                data['idChild'] = appointment.idChild;
                data['startDate'] = new Date(appointment.startDate);
                data['endDate'] = new Date(appointment.endDate);
                data['description'] = appointment.description;
                schedule.push(data);
            })
            console.log(schedule);
        });
    return schedule;
}

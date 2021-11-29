import React from 'react';
import Scheduler, { Resource } from 'devextreme-react/scheduler';

import ScheduleTemplate from './ScheduleTemplate';
import data from './data'

const schedule = data.schedule;
const teacher = data.teacher;
const children = data.children;
const currentDate = new Date();
const views = ['month'];

class MySchedule extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Scheduler
                    dataSource={schedule}
                    views={views}
                    defaultCurrentView='month'
                    showAllDayPanel={false}
                    defaultCurrentDate={currentDate}
                    editing={false}
                    height={600}
                    appointmentRender={ScheduleTemplate}
                >
                    <Resource
                        label='Teachers'
                        dataSource={teacher}
                        fieldExpr='idUser'
                    />
                    <Resource
                        label='Child'
                        dataSource={children}
                        fieldExpr='idChild'
                    />
                </Scheduler>
            </React.Fragment>
        );
    }
}

export default MySchedule;
import React from 'react';
import Scheduler, { Resource } from 'devextreme-react/scheduler';

import ScheduleTemplate from '../User/Schedule/MySchedule/ScheduleTemplate';
import data from '../User/Schedule/MySchedule/data';
import { teachers } from './ChildProfile/teachers';

const children = data.children;
const currentDate = new Date();
const views = ['month'];

function Schedule(props) {

    return (
        <React.Fragment>
            <Scheduler
                dataSource={props.appointments}
                views={views}
                defaultCurrentView='month'
                showAllDayPanel={false}
                defaultCurrentDate={currentDate}
                editing={false}
                height={600}
                appointmentRender={ScheduleTemplate}
            >
                {props.role === 'teacher' ? <Resource
                    label='Child'
                    dataSource={children}
                    fieldExpr='idChild'
                /> :
                    <Resource
                        label='Teacher'
                        dataSource={teachers}
                        fieldExpr='idUser'
                    />}
            </Scheduler>
        </React.Fragment>
    )
}

export default Schedule;
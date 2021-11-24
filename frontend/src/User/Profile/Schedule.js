import React from 'react';
import Scheduler, { Resource } from 'devextreme-react/scheduler';

import ScheduleTemplate from '../Schedule/MySchedule/ScheduleTemplate';
import { children } from '../Schedule/MySchedule/children';

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
                <Resource
                    label='Child'
                    dataSource={children}
                    fieldExpr='idChild'
                />
            </Scheduler>
        </React.Fragment>
    )
}

export default Schedule;
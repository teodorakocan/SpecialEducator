import React from 'react';

import AddDailyReport from '../DailyReports/AddDailyReport';
import Estimate from '../Estimate';
import ChildProfileData from '../ChildProfileData';
import ListOfDailyReports from '../DailyReports/ListOfDailyReports';

function ChildProfileBoard(props) {

    switch (props.activeItem) {
        case 'profile':
            return <ChildProfileData childId={props.childId} role={props.role} />
        case 'dailyReport':
            return <AddDailyReport child={props.child} childId={props.childId} />
        case 'listOfDailyReports':
            return <ListOfDailyReports childId={props.childId} />
        default:
            return <Estimate childId={props.childId} />
    }
};

export default ChildProfileBoard;
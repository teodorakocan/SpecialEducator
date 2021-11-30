import React from 'react';

import AddDailyReport from '../DailyReports/AddDailyReport';
import ChildProfileData from '../ChildProfileData';
import ListOfChildsDailyReports from '../DailyReports/ListOfChildsDailyReports';
import AddNewEstimate from '../Estimate/AddNewEstimate';
import ListOfChildsEstimates from '../Estimate/ListOfChildsEstimates';

function ChildProfileBoard(props) {

    switch (props.activeItem) {
        case 'profile':
            return <ChildProfileData childId={props.childId} role={props.role} />
        case 'dailyReport':
            return <AddDailyReport child={props.child} childId={props.childId} />
        case 'listOfDailyReports':
            return <ListOfChildsDailyReports childId={props.childId} />
        case 'listOfEstimates':
            return <ListOfChildsEstimates teacherRole={props.teacherRole} childId={props.childId} />
        default:
            return <AddNewEstimate childId={props.childId} />
    }
};

export default ChildProfileBoard;
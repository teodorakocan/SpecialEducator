import React from 'react';

import AddDailyReport from '../DailyReports/AddDailyReport';
import ChildProfileData from '../ChildProfileData';
import ListOfChildsDailyReports from '../DailyReports/ListOfChildsDailyReports';
import AddEstimate from '../Estimates/AddEstimate';
import ListOfChildsEstimates from '../Estimates/ListOfChildsEstimates';
import DigramsMainPage from '../Diagrams/DiagramsMainPage';

function ChildProfileBoard(props) {

    switch (props.activeItem) {
        case 'addEstimate':
            return <AddEstimate />
        case 'addDailyReport':
            return <AddDailyReport />
        case 'listOfDailyReports':
            return <ListOfChildsDailyReports />
        case 'listOfEstimates':
            return <ListOfChildsEstimates teacherRole={props.teacherRole} />
        case 'diagrams':
            return <DigramsMainPage />
        default:
            return <ChildProfileData />
    }
};

export default ChildProfileBoard;
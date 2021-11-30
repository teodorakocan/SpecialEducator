import React from 'react';

import AddDailyReport from '../DailyReports/AddDailyReport';
import ChildProfileData from '../ChildProfileData';
import ListOfChildsDailyReports from '../DailyReports/ListOfChildsDailyReports';
import AddNewEstimate from '../Estimates/AddNewEstimate';
import ListOfChildsEstimates from '../Estimates/ListOfChildsEstimates';
import DigramsMainPage from '../Diagrams/DiagramsMainPage';

function ChildProfileBoard(props) {

    switch (props.activeItem) {
        case 'addNewEstimate':
            return <AddNewEstimate />
        case 'dailyReport':
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
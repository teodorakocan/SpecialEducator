import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainRegistrationPage from './Registration/MainRegistrationPage';
import StartApp from './StartApp';
import NotAuthorized from './HelpPages/NotAuthorized';
import NotAuthenticated from './HelpPages/NotAuthenticated';
import NotFound from './HelpPages/NotFound';
import ResetPasswordRequest from './ForgotPassword/ResetPasswordRequest';
import ResetPassword from './ForgotPassword/ResetPassword';
import Profile from './User/Profile/Profile';
import DailyReportView from './User/Profile/ChildProfile/DailyReports/DailyReportView';
import EstimateView from './User/Profile/ChildProfile/Estimates/EstimateView';
import MonthlyDailyReportDiagram from './ParentView/MonthlyDailyReportDiagram';
import AnnualEstimateDiagram from './ParentView/AnnualEstimateDiagram';

const isLogged = localStorage.getItem('loggedIn') ? true : false

const routing = (
    <BrowserRouter>
        <Routes>
            <Route exect path='/' element={<StartApp />} />
            {!isLogged && <Route path='/registration' element={<MainRegistrationPage />} />}
            <Route path='/notAuthorized' element={<NotAuthorized />} />
            <Route path='/notFound' element={<NotFound />} />
            <Route path='/notAuthenticated' element={<NotAuthenticated />} />
            <Route path='/forgotPassword' element={<ResetPasswordRequest />} />
            <Route path='/resetPassword' element={<ResetPassword />} />
            {isLogged && <Route path='/profile/:role/:id' element={<Profile />} />}
            {isLogged && <Route path='/dailyReport/:id' element={<DailyReportView />} />}
            {isLogged && <Route path='/estimate/:id' element={<EstimateView />} />}
            <Route path='/monthlyDailyReportDiagram' element={<MonthlyDailyReportDiagram />} />
            <Route path='/annualEstimateDiagram' element={<AnnualEstimateDiagram />} />
        </Routes>
    </BrowserRouter>
)
ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();

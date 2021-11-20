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
import MakeAnAppointment from './User/Schedule/MakeAnAppointment';

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
            <Route path='/makeAnAppointment' element={<MakeAnAppointment />} />
        </Routes>
    </BrowserRouter>
)
ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();

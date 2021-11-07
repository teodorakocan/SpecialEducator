import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import MainRegistrationPage from './Registration/MainRegistrationPage';
import Login from './Login/Login';

const routing = (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/registration' element={<MainRegistrationPage />} />
    </Routes>
  </BrowserRouter>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();

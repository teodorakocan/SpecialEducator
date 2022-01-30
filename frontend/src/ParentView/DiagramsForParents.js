import React, { useState } from 'react';

import CheckParentPassword from './CheckParentPassword';
import DiagramsView from './DiagramsView';
import axiosInstance from '../serverConnection/axios';
import { authHeader } from '../serverConnection/authHeader';

function DigramsForParents() {

    const [activeItem, setActiveItem] = useState('enterPassword');
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const childId = params.get('childId');

    function CheckPassword(password) {
        axiosInstance.get('/user/checkParentPassword', {
            headers: authHeader(),
            params: {
                childId: childId,
                password: password
            }
        })
            .then((response) => {
                if (response.data.status === 'success') {
                    setActiveItem('diagrams');
                } else {
                    setActiveItem('enterPassword');
                    setHasError(true);
                    setErrorMessage('Invalid password');
                }
            });

    }

    switch (activeItem) {
        case 'enterPassword':
            return <CheckParentPassword CheckPassword={CheckPassword} hasError={hasError} errorMessage={errorMessage}/>
        default:
            return <DiagramsView />
    }

}

export default DigramsForParents;
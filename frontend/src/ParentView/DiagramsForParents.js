import React, {useState} from 'react';

import CheckParentPassword from './CheckParentPassword';
import DiagramsView from './DiagramsView';
import axiosInstance from '../serverConnection/axios';
import {authHeader} from '../serverConnection/authHeader';

function DigramsForParents() {

    const [activeItem, setActiveItem] = useState('enterPassword')
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
                }else{
                    setActiveItem('enterPassword');
                }
            });
        
    }

    switch (activeItem) {
        case 'enterPassword':
            return <CheckParentPassword CheckPassword={CheckPassword} />
        default:
            return <DiagramsView />
    }

}

export default DigramsForParents;
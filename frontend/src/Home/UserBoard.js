import React from 'react';

import ChangeProfileData from '../User/Account/ChangeProfileData';
import ChangeProfileImage from '../User/Account/ChangeProfileImage';
import ChangePassword from '../User/Account/ChangePassword';
import HomePage from '../User/HomePage';
import CenterData from '../Center/CenterData';
import ChangeCenterData from '../Center/ChangeCenterData';
import MainNewChildPage from '../User/Admin/AddChild/MainNewChildPage';
import AddNewUser from '../User/Admin/AddNewUser/AddNewUser';
import MakeAnAppointment from '../User/Schedule/MakeAnAppointment';

function UserBoard(props) {

    switch (props.activeItem) {
        case 'profile':
            return <ChangeProfileData user={props.user} onClickChangeUserData={props.onClickChangeUserData} />
        case 'password':
            return <ChangePassword user={props.user} />
        case 'image':
            return <ChangeProfileImage image={props.user['image']} onClickUploadImage={props.onClickUploadImage} />
        case 'center':
            return <CenterData center={props.center} />
        case 'changeCenterData':
            return <ChangeCenterData center={props.center} />
        case 'addChild':
            return <MainNewChildPage />
        case 'addNewUser':
            return <AddNewUser />
        case 'makeAnAppointment':
            return <MakeAnAppointment />
        default:
            return <HomePage />
    }
};

export default UserBoard;
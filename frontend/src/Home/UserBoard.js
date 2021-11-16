import React from 'react';

import ChangeProfileData from '../user/Account/ChangeProfileData';
import ChangeProfileImage from '../user/Account/ChangeProfileImage';
import ChangePassword from '../user/Account/ChangePassword';
import HomePage from '../user/HomePage';
import CenterData from '../center/CenterData';
import ChangeCenterData from '../center/ChangeCenterData';
import MainNewChildPage from '../user/admin/AddChild/MainNewChildPage';
import AddNewUser from '../user/admin/AddNewUser/AddNewUser';

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
        default:
            return <HomePage />
    }
};

export default UserBoard;
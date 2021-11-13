import React from 'react';

import ChangeProfileInformation from '../user/Account/ChangeProfileInformation';
import ChangeProfileImage from '../user/Account/ChangeProfileImage';
import ChangePassword from '../user/Account/ChangePassword';
import HomePage from '../user/HomePage';

function UserBoard(props) {

    switch (props.activeItem) {
        case 'profile':
            return <ChangeProfileInformation user={props.user} onClickChangeData={props.onClickChangeData} />
        case 'password':
            return <ChangePassword user={props.user} />
        case 'image':
            return <ChangeProfileImage image={props.user['image']} onClickUploadImage={props.onClickUploadImage} />
        default:
            return <HomePage />
    }
};

export default UserBoard;
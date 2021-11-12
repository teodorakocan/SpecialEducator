import React from 'react';

import Profile from '../user/Account/Profile';
import ProfileImage from '../user/Account/ProfileImage';
import ChangePassword from '../user/Account/ChangePassword';

function UserBoard(props) {

    switch (props.activeItem) {
        case 'profile':
            return <Profile user={props.user} onChangeData={props.onChangeData} />
        case 'image':
            return <ProfileImage />
        default:
            return <ChangePassword />
    }
};

export default UserBoard;
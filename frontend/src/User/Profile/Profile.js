import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { useNavigate } from 'react-router';

import TeacherProfileData from './TeacherProfileData';
import ChildProfile from './ChildProfile/MainCommponentOfProfile/ChildProfile';
import axiosInstance from '../../serverConnection/axios';
import {authHeader} from '../../serverConnection/authHeader';

function Profile() {
    const { role } = useParams();
    const [teacherRole, setTeacherRole] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.get('/authUser/getTeacherRole', {
            headers: authHeader()
        })
            .then((response) => {
                if (response.data.status === 'success') {
                    setTeacherRole(response.data.role);
                }
            }).catch((error) => {
                if (typeof error.response === 'undefined') {
                    navigate('/notFound');
                } else if (error.response.status === 403) {
                    navigate('/notAuthenticated');
                } else {
                    navigate('/notFound');
                }
            })
    })

    return (
        <Container style={{ padding: '15px' }}>
            {role === 'teacher' ? <TeacherProfileData /> :
                <ChildProfile teacherRole={teacherRole} />}
        </Container>
    )
}

export default Profile;
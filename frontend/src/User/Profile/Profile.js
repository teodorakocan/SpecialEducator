import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import TeacherProfileData from './TeacherProfileData';
import ChildProfile from './ChildProfile';

function Profile() {
    const { role, id } = useParams();

    return (
        <Container style={{padding:'15px'}}>
            {role === 'teacher' ? <TeacherProfileData teacherId={id} /> :
                <ChildProfile childId={id} />}
        </Container>
    )
}

export default Profile;
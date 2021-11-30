import React from 'react';
import { Grid, Image, Segment } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';

import useTeacherData from '../../hooks/useTeacherData';
import '../../MainPage/HomeStyle.css'
import Schedule from './Schedule';

function TeacherProfilData() {

    const { role, id } = useParams();
    const [teacher, appointments] = useTeacherData(id);

    const teacherImage = Object.values(teacher).map((teacher, index) =>
        <Image src={'http://localhost:9000/' + teacher.image} key={index} style={{ height: '300px', width: '300px' }} />
    )
    const teacherData = Object.values(teacher).map((teacher, index) =>
        <Segment basic key={index}>
            <p className='title'>{teacher.name + ' ' + teacher.lastName}</p>
            <p className='subTitle'>{teacher.role}</p>
            <p className='subTitle'>{teacher.email}</p>
        </Segment>
    )

    return (
        <Grid>
            <Grid.Row columns={2}>
                <Grid.Column>
                    {teacherImage}
                </Grid.Column>
                <Grid.Column>
                    {teacherData}
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Schedule appointments={appointments} teacher={teacher} role={role} />
            </Grid.Row>
        </Grid>
    )
}

export default TeacherProfilData;
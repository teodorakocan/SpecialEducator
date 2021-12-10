import React, { useState } from 'react';
import { Grid, Image, Segment, Button, Confirm } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';

import useTeacherData from '../hooks/useTeacherData';
import '../MainPage/HomeStyle.css'
import Schedule from './Schedule';
import axiosInstance from '../serverConnection/axios';
import {authHeader} from '../serverConnection/authHeader';

function TeacherProfilData() {

    const { role, id } = useParams();
    const [teacher, appointments] = useTeacherData(id);
    const [close, setClose] = useState(false);
    const navigate = useNavigate();

    const teacherImage = Object.values(teacher).map((teacher, index) =>
        <Image src={'http://localhost:9000/' + teacher.image} key={index} style={{ height: '300px', width: '300px' }} />
    )
    const teacherData = Object.values(teacher).map((teacher, index) =>
        <Segment basic key={index}>
            <p className='title'>{teacher.name + ' ' + teacher.lastName}</p>
            <p className='subTitle'>{teacher.role}</p>
            <p className='subTitle'>{teacher.email}</p>
            <div>
                <Button color='red' onClick={() => setClose(true)}>Remove teacher from center</Button>
                <Confirm
                    open={close}
                    onCancel={() => setClose(false)}
                    onConfirm={removeTeacher}
                />
            </div>
        </Segment>
    )

    function removeTeacher() {
        axiosInstance.post('/admin/removeTeacher', {}, {
            headers: authHeader(),
            params: {
                teacherId: id,
            }
        })
            .then((response) => {
                if (response.data.status === 'success') {
                    navigate('/');
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
    }

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
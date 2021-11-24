import React, { useState } from 'react';
import { Grid, Input, Button, Feed, Image } from 'semantic-ui-react';
import { useNavigate } from 'react-router';

import { teachers } from './teachers';
import axiosInstance from '../../../serverConnection/axios';
import { authHeader } from '../../../serverConnection/authHeader';

function ListOfTeachersPage() {

    const [teacherName, setTeacherName] = useState();
    const [allTeachers, setAllTeachers] = useState(teachers);
    const [noRequestedTeacher, setNoRequestedTeacher] = useState(false);
    const navigate = useNavigate();

    const allTeachersComponents = Object.values(allTeachers).map((teacher, index) =>
        <Feed key={index}>
            <Feed.Event>
                <Feed.Label>
                    <Image src={'http://localhost:9000/' + teacher.image} avatar />
                </Feed.Label>
                <Feed.Content>
                    <Feed.Summary>
                        <a>{teacher.name + ' ' + teacher.lastName}</a>
                    </Feed.Summary>
                </Feed.Content>
            </Feed.Event>
        </Feed>
    )

    function onClickSearchTeacher() {
        if (teacherName !== '') {
            axiosInstance.get('/admin/searchTeacher', {
                headers: authHeader(),
                params: {
                    fullName: teacherName
                }
            })
                .then((response) => {
                    if (response.data.status === 'success') {
                        if (response.data.teacher.length > 0) {
                            setAllTeachers(response.data.teacher);
                            setNoRequestedTeacher(false);
                        } else {
                            setAllTeachers(response.data.teacher);
                            setNoRequestedTeacher(true);
                        }
                    }
                }).catch((error) => {
                    if (typeof error.response === 'undefined') {
                        navigate('/notFound');
                    } else if (error.response.status === 403) {
                        navigate('/notAuthenticated');
                    } else if (error.response.status === 404) {
                        navigate('/notFound');
                    } else {
                        navigate('/notAuthorized');
                    }
                });
        } else {
            setAllTeachers(teachers);
            setNoRequestedTeacher(false);
        }
    }

    return (
        <Grid divided='vertically'>
            <Grid.Row >
                <Grid.Column>
                    <Input
                        icon={{ name: 'search' }}
                        placeholder='Search...'
                        onChange={(e) => setTeacherName(e.target.value)}
                        action={<Button basic onClick={onClickSearchTeacher}> </Button>}
                    />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row >
                <Grid.Column>
                    {allTeachersComponents}
                    {noRequestedTeacher && <div>Teacher with requested name is not registered...</div>}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default ListOfTeachersPage;
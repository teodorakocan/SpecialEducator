import React, { useState } from 'react';
import { Grid, Image, Card, Button, Confirm } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';

import Schedule from '../Schedule'
import useChildData from '../../hooks/useChildData';
import axiosInstance from '../../serverConnection/axios';
import { authHeader } from '../../serverConnection/authHeader';
import ParentData from '../../Child/ParentData';
import ChangeChildData from '../../Child/ChangeChildData';
import ViewChildsAnamnesis from '../../Child/ViewChildsAnamnesis';

function ChildProfileData() {

    const { role, id } = useParams();
    const [child, appointments] = useChildData(id);
    const [close, setClose] = useState(false);
    const [activeItem, setActiveItem] = useState('schedule');
    const navigate = useNavigate();

    const childData = Object.values(child).map((child, index) =>
        <Card key={index}>
            <Image src={child.image} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{child.name + ' ' + child.lastName}</Card.Header>
                <Card.Meta>
                    <span className='date'>{'Date of birth: ' + child.dateOfBirth}</span>
                </Card.Meta>
            </Card.Content>
        </Card>
    )

    function onClickChangeChildData() {
        setActiveItem('changeChildProfile');;
    }

    function onParentData() {
        setActiveItem('parent');
    }

    function onClickViewChildsAnamnesis() {
        setActiveItem('anamnesis');
    }

    function onClickViewChildsSchedule() {
        setActiveItem('schedule');
    }

    function removeChild() {
        axiosInstance.post('/admin/removeChild', {}, {
            headers: authHeader(),
            params: {
                childId: id,
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
            <Grid.Row>
                <Grid.Column width={4}>
                    {childData}
                    <Button.Group vertical>
                        <Button color='orange' onClick={onClickViewChildsSchedule}>Child's schedule</Button>
                        <Button color='orange' onClick={onClickChangeChildData}>Change child data</Button>
                        <Button color='orange' onClick={onClickViewChildsAnamnesis}>Child's anamnesis</Button>
                        <Button color='orange' onClick={onParentData}>Parent data</Button>
                        <div>
                            <Button color='red' onClick={() => setClose(true)}>Remove child from center</Button>
                            <Confirm
                                open={close}
                                onCancel={() => setClose(false)}
                                onConfirm={removeChild}
                            />
                        </div>
                    </Button.Group>
                </Grid.Column>
                <Grid.Column width={10}>
                    {activeItem === 'schedule' && <Schedule appointments={appointments} child={child} role={role} />}
                    {activeItem === 'parent' && <ParentData childId={id} />}
                    {activeItem === 'changeChildProfile' && <ChangeChildData childId={id} />}
                    {activeItem === 'anamnesis' && <ViewChildsAnamnesis childId={id} />}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default ChildProfileData;
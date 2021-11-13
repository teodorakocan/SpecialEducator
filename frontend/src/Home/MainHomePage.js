import React, { useEffect, useState } from 'react';
import { Grid, Image, Container, Button, Icon } from 'semantic-ui-react'

import axiosInstance from '../serverConnection/axios';
import { authHeader } from '../serverConnection/authHeader';
import UserBoard from './UserBoard';
import MenuItems from './MenuItems';
import './HomeStyle.css'
import avatar from '../images/avatar.png';
import { useNavigate } from 'react-router';

const MainHomePage = () => {

    const [user, setUser] = useState({});
    const [imageURL, setImageURL] = useState(null);
    const [activeItem, setActiveItem] = useState('home');
    const navigate = useNavigate();

    useEffect(() => {
        getData(); 
    }, []);

    function getData() {
        axiosInstance.get('/api/user/data', { headers: authHeader() })
            .then((resposnse) => {
                setUser(resposnse.data.user);
                if (resposnse.data.user['image']) {
                    setImageURL('http://localhost:9000/' + resposnse.data.user['image']);
                } else {
                    setImageURL(avatar);
                }
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    navigate('/notAuthorized');
                } else {
                    navigate('notFound');
                }
            });
    }

    function onClickChangeData() {
        getData();
    }


    function onClickUploadImage(file){
        var formData = new FormData();
        formData.append('file', file[0]);

        axiosInstance.post('api/user/changeImage', formData, {
            headers: authHeader()
        }).then((response)=>{
            debugger
            if(response.data.status === 'success')
            {
                getData();
            }
        }).catch((error) => {
            if (error.response.status === 401) {
                navigate('/notAuthorized');
            } else {
                navigate('notFound');
            }
        });
    }

    return (
        <Container className='containerMenu'>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image style={{paddingLeft:'5px', paddingRight:'5px'}}  src={imageURL} size='huge'/>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <div>
                            <div className='title'>
                                {user['name'] + ' ' + user['lastName']}
                            </div><br />
                            <div className='subTitle'>
                                {user['email']}
                            </div>
                            <div className='role'>
                                {user['role']}
                            </div>
                        </div>
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Button icon inverted color='orange' circular floated='right' onClick={() => setActiveItem('')}> 
                            <Icon size='large' name='home' />
                        </Button>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row style={{ padding: '30px' }}>
                    <Grid.Column width={5}>
                        <MenuItems handleChange={(name) => setActiveItem(name)} activeItem={activeItem} />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <UserBoard activeItem={activeItem} user={user} onClickChangeData={onClickChangeData}
                        onClickUploadImage={onClickUploadImage} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
};

export default MainHomePage;
import React, { useEffect, useState } from 'react';
import { Grid, Image, Container } from 'semantic-ui-react'

import axiosInstance from '../serverConnection/axios';
import { authHeader } from '../serverConnection/authHeader';
import UserBoard from './UserBoard';
import MenuItems from './MenuItems';
import './HomeStyle.css'
import avatar from '../images/avatar.png';

const MainHomePage = () => {

    const [user, setUser] = useState({});
    const [imageURL, setImageURL] = useState(null);
    const [activeItem, setActiveItem] = useState('');
    
    useEffect(() => {
        getData(); //kako zameniti ovo sa nekim custom hook-om da mi se na sekund kada loaduje stranicu ne pojavi undefined
    }, []);

    function getData(){
        axiosInstance.get('/api/user/data', { headers: authHeader() })
        .then((resposnse) => {
            setUser(resposnse.data.user);
            if(resposnse.data.user['image']){
            setImageURL('http://localhost:9000/' + resposnse.data.user['image']);
            }else{
                setImageURL(avatar);
            }
        })
        .catch((error) => {
            console.log(error.response.status);
            console.log(error.response.data.message);
            //navigate(-1);//ukoliko nisi ulogovan ne mozes na ovu stranicu i vratice te na prethodnu
        });
    }

    function handleChange(name) {
        setActiveItem(name);
    }

    function onChangeData(){
        getData();
    }

    return (
        <Container style={{ background: 'white', height: '100%', padding: '20px' }}>
            <Grid>
            <Grid.Row>
                    <Grid.Column width={2}>
                        <Image src={imageURL} avatar size='small' />
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
                </Grid.Row>

                <Grid.Row style={{ padding: '30px' }}>
                    <Grid.Column width={5}>
                        <MenuItems handleChange={handleChange} activeItem={activeItem} />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <UserBoard activeItem={activeItem} user={user} onChangeData={onChangeData} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
};

export default MainHomePage;
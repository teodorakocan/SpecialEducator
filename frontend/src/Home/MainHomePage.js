import React, { useEffect, useState } from 'react';
import { Grid, Image, Container, GridColumn } from 'semantic-ui-react'

import axiosInstance from '../serverConnection/axios';
import { authHeader } from '../serverConnection/authHeader';

const MainHomePage = () => {

    const [user, setUser] = useState({});
    const [imageURL, setImageURL] = useState(null);
    //kad mi se vrate podaci o ulogovanom korisniku ako je response 401 vrati mi page notfound
    useEffect(() => {
        axiosInstance.get('/api/user/data', { headers: authHeader() })
            .then((resposnse) => {
                console.log(resposnse.data);
                setUser(resposnse.data.user);
                setImageURL('http://localhost:9000/' + resposnse.data.user['image'])
            })
            .catch((error) => {
                console.log(error.response.status);
                console.log(error.response.data.message);
                //navigate(-1);//ukoliko nisi ulogovan ne mozes na ovu stranicu i vratice te na prethodnu
            });
    }, []);

    return (
        <div><br />
            <Container>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={2}>
                            <Image src={imageURL} avatar size='small' />
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <div>
                                <div style={{ fontSize: '34px', fontWeight: 'bold', color: '#ff5500', fontFamily: 'Verdana, Arial, Helvetica, sans-serif' }}>
                                    {user['name'] + ' ' + user['lastName']}
                                </div><br/>
                            <div style={{ fontSize: '20px', color: '#ff5500', fontFamily: 'Verdana, Arial, Helvetica, sans-serif' }}>
                                    {user['email']}
                                </div>
                                <div style={{ fontSize: '18px', color: '#ff5500', fontFamily: 'Verdana, Arial, Helvetica, sans-serif' }}>
                                    {user['role']}
                                </div>
                            </div>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column width={5}>

                        </Grid.Column>
                        <Grid.Column width={10}>

                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </div>
    )
};

export default MainHomePage;
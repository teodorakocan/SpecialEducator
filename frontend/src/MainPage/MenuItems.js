import React, { useState } from 'react';
import { Menu, Icon, Confirm } from 'semantic-ui-react'
import { useNavigate } from 'react-router';

import axiosInstance from '../serverConnection/axios';
import { authHeader } from '../serverConnection/authHeader';

function MenuItems(props) {
    const [close, setClose] = useState(false);
    const navigate = useNavigate();

    function handleChange(e, { name }) {
        e.preventDefault();
        props.handleChange(name);
    }

    function deleteAcoount() {
        axiosInstance.post('/authUser/deleteAccount', {}, {
            headers: authHeader()
        })
            .then((response) => {
                if (response.data.status === 'success') {
                    setClose(false);
                    localStorage.removeItem('loggedIn')
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
        <Menu pointing secondary vertical color='orange'>
            <Menu.Header>Account</Menu.Header>
            <Menu.Menu>
                <Menu.Item
                    name='profile'
                    active={props.activeItem === 'profile'}
                    onClick={handleChange}>
                    <Icon name='user' /> Change profile data
                </Menu.Item>
                <Menu.Item
                    name='password'
                    active={props.activeItem === 'password'}
                    onClick={handleChange}>
                    <Icon name='pencil alternate' /> Change password
                </Menu.Item>
                <Menu.Item
                    name='image'
                    active={props.activeItem === 'image'}
                    onClick={handleChange}>
                    <Icon name='image' /> Change profile image
                </Menu.Item>
            </Menu.Menu>

            <Menu.Header>Center</Menu.Header>
            <Menu.Menu>
                <Menu.Item
                    name='center'
                    active={props.activeItem === 'center'}
                    onClick={handleChange}>
                    <Icon name='building' /> Center information
                </Menu.Item>
                {props.role === 'admin' &&
                    <div>
                        <Menu.Item
                            name='changeCenterData'
                            active={props.activeItem === 'changeCenterData'}
                            onClick={handleChange}>
                            <Icon name='pencil alternate' /> Change center data
                        </Menu.Item>

                        <Menu.Item
                            name='addChild'
                            active={props.activeItem === 'addChild'}
                            onClick={handleChange}>
                            <Icon name='child' /> Add child
                        </Menu.Item>
                    </div>
                }
            </Menu.Menu>

            {props.role === 'admin' &&
                <div><Menu.Header>Teachers</Menu.Header>
                    <Menu.Menu>
                        <Menu.Item
                            name='allTeachers'
                            active={props.activeItem === 'allTeachers'}
                            onClick={handleChange}>
                            <Icon name='group' /> List of teachers in center
                        </Menu.Item>

                        <Menu.Item
                            name='addNewUser'
                            active={props.activeItem === 'addNewUser'}
                            onClick={handleChange}>
                            <Icon name='user plus' /> Add new member
                        </Menu.Item>
                    </Menu.Menu>
                </div>}

            <Menu.Header>Schedule</Menu.Header>
            <Menu.Menu>
                <Menu.Item
                    name='mySchedule'
                    active={props.activeItem === 'mySchedule'}
                    onClick={handleChange}>
                    <Icon name='calendar alternate' /> My schedule
                </Menu.Item>

                {props.role === 'admin' &&
                    <div>
                        <Menu.Item
                            name='makeAnAppointment'
                            active={props.activeItem === 'makeAnAppointment'}
                            onClick={handleChange}>
                            <Icon name='calendar plus outline' /> Make an appointment
                        </Menu.Item>
                    </div>
                }
            </Menu.Menu>


            <Menu.Header>Settings</Menu.Header>
            <Menu.Menu>
                <Menu.Item
                    name='logOut'
                    active={props.activeItem === 'logOut'}
                    onClick={handleChange}>
                    <Icon name='sign-out' /> Log out
                </Menu.Item>

                <Menu.Item
                    name='deleteAccount'
                    style={{ color: 'red' }}
                    active={props.activeItem === 'deleteAccount'}
                    onClick={() => setClose(true)}>
                    <Confirm
                        open={close}
                        onCancel={() => setClose(false)}
                        onConfirm={deleteAcoount}
                    />
                    <Icon name='user delete' /> Delete account
                </Menu.Item>
            </Menu.Menu>

        </Menu>
    )
};

export default MenuItems;
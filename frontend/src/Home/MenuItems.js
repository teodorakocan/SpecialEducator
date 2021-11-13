import React from 'react';
import { Menu, Icon } from 'semantic-ui-react'

function MenuItems(props){

    function handleChange(e, { name }) {
        e.preventDefault();
        props.handleChange(name);
    }

    return(
        <Menu pointing secondary vertical color='orange'>
                            <Menu.Header>Account</Menu.Header>
                            <Menu.Menu>
                                <Menu.Item
                                    name='profile'
                                    active={props.activeItem === 'profile'}
                                    onClick={handleChange}>
                                    <Icon name='user' /> Change profile infomration
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
                        </Menu>
    )
};

export default MenuItems;
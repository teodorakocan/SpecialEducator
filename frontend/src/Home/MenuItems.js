import React from 'react';
import { Menu, Icon } from 'semantic-ui-react'

function MenuItems(props) {

    function handleChange(e, { name }) {
        e.preventDefault();
        props.handleChange(name);
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

                        <Menu.Item
                            name='addNewUser'
                            active={props.activeItem === 'addNewUser'}
                            onClick={handleChange}>
                            <Icon name='user plus' /> Add new member
                        </Menu.Item>
                    </div>
                }
            </Menu.Menu>
        </Menu>
    )
};

export default MenuItems;
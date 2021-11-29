import React from 'react';
import { Menu } from 'semantic-ui-react'
import useCheckIfItIsTimeForEstimate from '../../../../hooks/useCheckIfItIsTimeForEstimate';

function MenuItems(props) {
//proverava da li je nastavnik admin ili obican nastavnik i da li je prvi u mesecu
//timeForEstimate staviti kao uslov kod menuitem estimate
  const timeForEstimate = useCheckIfItIsTimeForEstimate(props.teacherRole); 

  function handleChangeActiveItem(e, { name }) {
    e.preventDefault();
    props.handleChangeActiveItem(name);
}

  return (
    <Menu pointing secondary>
      <Menu.Item
        name='profile'
        active={props.activeItem === 'profile'}
        onClick={handleChangeActiveItem}
      />
      <Menu.Item
        name='dailyReport'
        active={props.activeItem === 'dailyReport'}
        onClick={handleChangeActiveItem}
      />
      <Menu.Item
        name='listOfDailyReports'
        active={props.activeItem === 'listOfDailyReports'}
        onClick={handleChangeActiveItem}
      />
      <Menu.Item
        name='estimate'
        active={props.activeItem === 'estimate'}
        onClick={handleChangeActiveItem}
      />
    </Menu>
  )
};

export default MenuItems;
import React from 'react';
import { Menu } from 'semantic-ui-react'
import useCheckIfItIsTimeForEstimate from '../../../hooks/useCheckIfItIsTimeForEstimate';

function MenuItems(props) {
  //proverava da li je nastavnik admin ili obican nastavnik i da li je prvi u mesecu
  //timeForEstimate staviti kao uslov kod menuitem estimate
  //const timeForEstimate = useCheckIfItIsTimeForEstimate(props.teacherRole);
  const timeForEstimate = true

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
        name='addDailyReport'
        active={props.activeItem === 'addDailyReport'}
        onClick={handleChangeActiveItem}
      />
      <Menu.Item
        name='listOfDailyReports'
        active={props.activeItem === 'listOfDailyReports'}
        onClick={handleChangeActiveItem}
      />
      {timeForEstimate && <Menu.Item
        name='addEstimate'
        active={props.activeItem === 'addEstimate'}
        onClick={handleChangeActiveItem}
      />}
      <Menu.Item
        name='listOfEstimates'
        active={props.activeItem === 'listOfEstimates'}
        onClick={handleChangeActiveItem}
      />
      <Menu.Item
        name='diagrams'
        active={props.activeItem === 'diagrams'}
        onClick={handleChangeActiveItem}
      />
    </Menu>
  )
};

export default MenuItems;
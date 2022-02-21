import React from 'react';
import { Menu } from 'semantic-ui-react'
import { useParams } from 'react-router-dom';
import useCheckIfEstimateExist from '../../../hooks/useCheckIfEstimateExist';

function MenuItems(props) {
  const { id } = useParams();
  var nowDateAndTime = new Date();
  let date = nowDateAndTime.getDate();
  const estimateExist = useCheckIfEstimateExist(id);

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
      {props.teacherRole === "admin" && (date == 2 || !estimateExist) && <Menu.Item
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
import React from 'react';
import Query from 'devextreme/data/query';

import data from './data'

const schedule = data.schedule;

function getMovieById(idUser, idChild) {
  return Query(schedule).filter(['idChild', idChild], ['idUser', idUser]).toArray()[0];
}

export default function ScheduleTemplate(model) {
  const scheduleInfo = getMovieById(model.appointmentData.idUser, model.appointmentData.idChild) || {};
  return (
    <div className="movie">
      <div className="movie-text">{scheduleInfo.text}</div>
    </div>
  );
}

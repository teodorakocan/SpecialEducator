import React from 'react';
import Query from 'devextreme/data/query';

import { appointments } from './appointments';

function getMovieById(idUser, idChild) {
  return Query(appointments).filter(['idChild', idChild], ['idUser', idUser]).toArray()[0];
}

export default function AppointmentTemplate(model) {
  const appointmentsInfo = getMovieById(model.appointmentData.idUser, model.appointmentData.idChild) || {};
  return (
    <div className="movie">
      <div className="movie-text">{appointmentsInfo.text}</div>
    </div>
  );
}

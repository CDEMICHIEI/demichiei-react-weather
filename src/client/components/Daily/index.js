import React from 'react';
import PropTypes from 'prop-types';
import Weather from '../Weather';

const Daily = (props) => (
  <div className="row daily">
    <h2 ><span className="fancybox">Today's Forecast for {props.day.name}</span></h2>
    <div className="col-xs-12 col-sm-6 col-sm-offset-3 today">
      <Weather {...props} />
    </div>
  </div>
);

Daily.propTypes = { day: PropTypes.object };

export default Daily;

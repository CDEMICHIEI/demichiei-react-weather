import React from 'react';
import PropTypes from 'prop-types';
import Weather from '../Weather';

const Forecast = (props) => {
  const week = props.days.map((day, i) =>
    <div className="col-sm-2 col-xs-12" key={i}>
      <Weather day={day} />
    </div>);
  return (
    <div className="row forecast">
      <h3><span className="fancybox">5-day Forecast</span></h3>
      <div className="col-sm-1" />
      {week}
    </div>
  );
};

Forecast.propTypes = { days: PropTypes.array };

export default Forecast;

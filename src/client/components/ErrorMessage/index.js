import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const ErrorMessage = (props) => (
  <div>
    <p className="bg-warning" >{props.errMessage}</p>
  </div>
);

ErrorMessage.propTypes = {
  errMessage: PropTypes.string,
};

export default ErrorMessage;

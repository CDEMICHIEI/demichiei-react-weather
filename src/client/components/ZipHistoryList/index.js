import React from 'react';
import PropTypes from 'prop-types';

const ZipHistoryList = (props) => {
  const list = props.history.map(item => <option value={item.zipcode} key={item.zipcode}>{item.city}</option>);
  return (
    <datalist id="history">
      {list}
    </datalist>
  );
};

ZipHistoryList.propTypes = {
  history: PropTypes.array.isRequired,
};

export default ZipHistoryList;

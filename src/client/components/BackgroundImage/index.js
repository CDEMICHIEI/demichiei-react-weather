import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

import cloudy from './weather/koushik-c-203268.png';
import clear from './weather/aleksandr-kozlovskii-2925.png';
import raining from './weather/reza-shayestehpour-14238.png';
import snowing from './weather/filip-bunkens-155405.png';
import overcast from './weather/stefan-widua-224033.png';
import thunder from './weather/guillaume-150.png';
import foggy from './weather/chad-madden-235406.png';

const weatherBG = { cloudy, clear, raining, snowing, overcast, thunder, foggy };

const getCondition = (condition) => {
  const conditionID = condition.substring(0, 1);

  switch (conditionID) {
    case '2':
      return 'thunder';
    case '3':
      return 'raining';
    case '5':
      return 'raining';
    case '6':
      return 'snowing';
    case '7':
      return 'foggy';
    case '8':
      if (condition === '800') {
        return 'clear';
      } else if (condition === '804') {
        return 'overcast';
      }
      return 'cloudy';
    default:
      return 'clear';
  }
};


const BackgroundImage = (props) => {
  const background = getCondition(props.conditionCode);
  const style = { backgroundImage: `url(${weatherBG[background]})` };
  return (
    <div className="background" style={style} />
  );
};

BackgroundImage.propTypes = { conditionCode: PropTypes.string };

export default BackgroundImage;

import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { getDay, getTime, firstLettersUpper } from '../../util/functions';

import i01d from './icons/01d.svg';
import i02d from './icons/02d.svg';
import i03d from './icons/03d.svg';
import i04d from './icons/04d.svg';
import i09d from './icons/09d.svg';
import i10d from './icons/10d.svg';
import i11d from './icons/11d.svg';
import i13d from './icons/13d.svg';
import i50d from './icons/50d.svg';
import i01n from './icons/01n.svg';
import i02n from './icons/02n.svg';
import i03n from './icons/03n.svg';
import i04n from './icons/04n.svg';
import i09n from './icons/09n.svg';
import i10n from './icons/10n.svg';
import i11n from './icons/11n.svg';
import i13n from './icons/13n.svg';
import i50n from './icons/50n.svg';

const icons = { i01d, i02d, i03d, i04d, i09d, i10d, i11d, i13d, i50d, i01n, i02n, i03n, i04n, i09n, i10n, i11n, i13n, i50n };

const Weather = (props) => {
  const day = props.day;
  const date = getDay(day.dt);
  // const style = { backgroundImage: `url(http://openweathermap.org/img/w/${day.weather[0].icon}.png)` };
  return (
    <div className="fancybox">
      <div className="row">
        <div className="col-sm-12 col-xs-4 day">{date}</div>
        <div className="col-xs-12">
          <div className="col-sm-12 col-xs-2 temp">{day.main.temp.toFixed(0)}°</div>
          <div className="iconContainer col-sm-12 col-xs-2 ">
            <img className={(day.sys.sunrise) ? 'icon' : 'icon-small'} role="presentation" src={icons[`i${day.weather[0].icon}`]} />
            {/* <div className={(day.sys.sunrise) ? 'icon' : 'icon-small'} style={style} /> */}
          </div>
          <div className="col-sm-12 col-xs-8 weather">{firstLettersUpper(day.weather[0].description)}</div>
        </div>
        {(day.sys.sunrise) &&
          <div className="col-xs-12 extraInfo">
            <div className="col-xs-4 ">{day.main.humidity}% hum.</div>
            <div className="col-xs-4 ">Sunrise: {getTime(day.sys.sunrise)}</div>
            <div className="col-xs-4 ">Sunset: {getTime(day.sys.sunset)}</div>
          </div>
        }
      </div>

    </div>
  );
};

Weather.propTypes = { day: PropTypes.object };
Weather.defaultProps = {
  day: {
    dt_txt: '---day',
    main: {
      temp: 0,
    },
    weather: [{
      icon: '01d',
      description: '--',
    }],
  } };

export default Weather;

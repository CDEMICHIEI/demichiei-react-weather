import fetch from 'node-fetch';
import env from '../config/env';


const { baseURL, appID, params } = env.weatherAPI;

const formatZip = zip => `?zip=${zip},us`;

const loadWeather = (qString, service) => {
  const URL = baseURL + service + qString + appID + params;
  return fetch(URL)
  .then(res => res.json())
  .catch(err => console.log(err));
};

export const WeatherGet = (req, res) => {
  const qString = formatZip(req.params.zip);
  // console.log(qString);
  const p = [loadWeather(qString, 'weather'), loadWeather(qString, 'forecast')];
  return Promise.all(p)
  .then(values => {
    res.send({ today: values[0], week: values[1] });
  });
};


// export default WeatherGet;

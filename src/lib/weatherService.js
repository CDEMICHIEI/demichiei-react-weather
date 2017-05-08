const baseURL = 'http://api.openweathermap.org/data/2.5/'
const appID = '&appid=b87ef13e00bc9136960cd7c0541a91b3'
const params = '&units=imperial&cnt=48'

const formatZip = zip => "?zip="+zip+",us"

const loadWeather = (qString,service) => {
  const URL = baseURL + service + qString + appID + params
  return fetch(URL)
  .then(res => res.json())
}

export const loadZip = zip => {
  const qString = formatZip(zip)
  const p =[loadWeather(qString,'weather'),loadWeather(qString,'forecast')]
  return Promise.all(p)
   .then(values => { return {today:values[0],week:values[1]}}
   )

}

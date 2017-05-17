const baseURL = 'http://localhost:3001/weather';


export const loadZip = zip => fetch(`${baseURL}/${zip}`)
  .then(res => res.json())
   .catch(err => console.log(err));

const baseURL = 'http://localhost:3001/history';

export const loadHistory = () =>
fetch(baseURL)
  .then(res => res.json())
  .catch(err => console.log(err));

export const saveHistory = (z) => {
  // console.log(z);
  return fetch(`${baseURL}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(z),
  })
   .then(res => res.json())
   .catch(err => console.log(err));
};

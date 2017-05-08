const baseURL = 'http://localhost:8080/zips'

export const loadHistory = () => {
  return fetch(baseURL)
  .then(res => res.json())
}
export const saveHistory = (z) => {
    return fetch(`${baseURL}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(z)
    }).then(res => res.json())
}

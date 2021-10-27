import axios from "./interceptors";
export function getRequest (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
        params: data
      })
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
}
export function postRequest (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
}
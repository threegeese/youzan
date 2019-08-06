import Axios from 'axios'

export default function fetch (url, data) {
  return new Promise((resolve, reject) => {
    Axios.post(url, data).then(response => {
      let status = response.data.status
      if (status === 200) {
        resolve(response)
      } else if (status === 300) {
        location.href = 'login.html'
        resolve(response)
      }
    }).catch(error => {
      reject(error)
    })
  })
}

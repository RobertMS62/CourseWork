import axios from 'axios'


const service = axios.create({
  baseURL: 'http://127.0.0.1:3000', 
  timeout: 10000 
})


service.interceptors.request.use(
  config => {

    return config
  },
  error => {
    return Promise.reject(error)
  }
)


service.interceptors.response.use(
  response => {
    const res = response
    if (res.status !== 200 && res.status !== 201) {
      alert(res.data.error)

      if (res.status === 502 || res.status === 500 || res.status === 400) {
        alert(res.data.error)
      }
    
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res.data
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service

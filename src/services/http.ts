import axios from 'axios'

const http = axios.create({
  baseURL: 'https://online-examination-0fcu.onrender.com/api/v1',
  // baseURL: 'http://localhost:8089/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
})

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default http

export const http2 = axios.create({
  baseURL: 'https://online-examination-0fcu.onrender.com/api/v1',
  // baseURL: 'http://localhost:8089/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
})

http2.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('st_access_token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

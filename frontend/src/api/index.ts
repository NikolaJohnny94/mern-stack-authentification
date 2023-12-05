import axios from 'axios'

import getTokenFromLocalStorage from '../utils/getTokenFromLocalStorage'

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
})

api.interceptors.request.use(
  (config) => {
    if (getTokenFromLocalStorage()) {
      config.headers.Authorization = `Bearer ${getTokenFromLocalStorage()}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

export default api

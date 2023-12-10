import axios from 'axios'

import getTokenFromLocalStorage from '../utils/getTokenFromLocalStorage'
import removeTokensFromLocalStorage from '../utils/removeTokensFromLocalStorage'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
})

api.interceptors.request.use(
  (config) => {
    const token = getTokenFromLocalStorage('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const initialRequest = error.config

    if (
      error.response.status === 401 &&
      error.response.data.message ===
        'User is not authorized to access this route! The access token expired!'
    ) {
      try {
        const refreshToken = getTokenFromLocalStorage('refreshToken')

        const data = await api.post('/api/auth/refresh-token', {
          token: refreshToken,
        })

        const { token } = data.data

        localStorage.setItem('token', token)

        initialRequest.headers.Authorization = `Bearer ${token}`

        return api(initialRequest)
      } catch (error) {
        console.log(error)

        removeTokensFromLocalStorage()
      }
    } else {
      removeTokensFromLocalStorage()
    }
    return Promise.reject(error)
  }
)

export default api

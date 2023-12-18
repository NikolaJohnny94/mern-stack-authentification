import axios from 'axios'
import api from '../../api/index'

import type { RegistrationInputData, LoginInputData } from '../../types'

class AuthService {
  registration(registrationData: RegistrationInputData) {
    const { username, email, password } = registrationData
    return api.post('/api/auth/registration', {
      username,
      email,
      password,
    })
  }

  login(loginData: LoginInputData) {
    const { loginIdentifier, password } = loginData
    return api.post('/api/auth/login', {
      loginIdentifier,
      password,
    })
  }

  logout() {
    return api.post('/api/auth/logout')
  }

  getUser() {
    return api.get('/api/auth/me')
  }
}

export default AuthService

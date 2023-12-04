import type { AuthInputData } from '../../../types'

class AuthService {
  registration(body: AuthInputData) {
    return fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
  }

  login(body: AuthInputData) {
    return fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(body),
    })
  }

  logout() {
    return fetch('http://localhost:5000/api/auth/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      credentials: 'include',
    })
  }

  getUser() {
    return fetch('http://localhost:5000/api/auth/me', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      credentials: 'include',
    })
  }
}

export default AuthService

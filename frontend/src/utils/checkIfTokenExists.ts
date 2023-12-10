import getTokenFromLocalStorage from './getTokenFromLocalStorage'

const checkIfTokenExists = (): boolean => {
  if (getTokenFromLocalStorage('token') === null) return false

  return true
}

export default checkIfTokenExists

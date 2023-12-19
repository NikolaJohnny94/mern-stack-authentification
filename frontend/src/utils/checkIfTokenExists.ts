import { getTokenFromLocalStorage } from './getTokenFromLocalStorage'

export const checkIfTokenExists = (): boolean => {
  if (getTokenFromLocalStorage('token') === null) return false

  return true
}

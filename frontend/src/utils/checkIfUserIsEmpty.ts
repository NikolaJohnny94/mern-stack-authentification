import type { User } from '../types'

const checkIfUserIsEmpty = (user: User): boolean => {
  return Object.keys(user).length === 0
}

export default checkIfUserIsEmpty

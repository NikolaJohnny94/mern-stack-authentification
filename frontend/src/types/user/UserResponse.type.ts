import type { User } from './User.type'

export type UserResponse = {
  success: boolean
  message: string
  data: User
}

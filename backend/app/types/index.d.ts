import type { Jwt } from 'jsonwebtoken'
import type { User } from './User.type'

export declare global {
  namespace Express {
    interface Request {
      user?: User | null
      decodedRefreshToken?: Jwt | null
    }
  }
}

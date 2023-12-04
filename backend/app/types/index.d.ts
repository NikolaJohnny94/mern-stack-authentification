import type { User } from './User.type'

export declare global {
  namespace Express {
    interface Request {
      user?: User | null
      expiredToken: any
    }
  }
}

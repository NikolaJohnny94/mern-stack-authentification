import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import UserService from '../services/api/userService'
import { UserSearchCriteria } from '../enums/UserSearchCriteria.enum'

import type { Request, Response, NextFunction } from 'express'
import type { JwtPayload } from '../types/JwtPayload.type'

const userService = new UserService()

export const protectedRoute = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string = ''

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'User is not authorised to access this route!',
      })
    } else {
      const decodedToken = jwt.verify(
        token,
        `${process.env.JWT_SECRET}`
      ) as JwtPayload

      const { id } = decodedToken

      req.user = await userService.findUser(UserSearchCriteria.id, id)

      next()
    }
  }
)

export const authorizedUsers = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
      if (!roles.includes(req.user?.role)) {
        res.status(403).json({
          success: false,
          message: "User doesn't neccessary permission to access this route!",
        })
      } else {
        next()
      }
    }
  }
}

import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'

import UserService from '../services/api/userService'
import { UserSearchCriteria } from '../enums/UserSearchCriteria.enum'

import type { Request, Response, NextFunction } from 'express'
import type { Jwt, VerifyErrors, VerifyOptions } from 'jsonwebtoken'
import type { JwtPayloadResponse } from '../types/responses/JwtPayloadResponse.type'

const userService = new UserService()

export const protectedRoute = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token = ''

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
      jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET as string,
        {} as VerifyOptions & { complete: true },
        async (
          error: VerifyErrors | null,
          decodedJwtPayload: Jwt | undefined
        ) => {
          if (error) {
            res.status(401).json({
              sucsess: false,
              message: `User is not authorized to access this route! The access token ${
                error.message === 'jwt expired' ? 'expired!' : 'is not valid!'
              }`,
            })
          } else {
            if (decodedJwtPayload) {
              const { id } = decodedJwtPayload as JwtPayloadResponse

              req.user = await userService.findUser(UserSearchCriteria.id, id)

              next()
            } else {
              res.status(500).json({
                success: false,
                message: 'Decoded refresh token is undefined!',
              })
            }
          }
        }
      )
    }
  }
)

export const protectedRefreshTokenRoute = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.body.token

    if (!refreshToken) {
      res.status(401).json({
        success: false,
        message:
          'User is not authorized to access this route! Refresh token not provided!',
      })
    } else {
      jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string,
        {} as VerifyOptions & { complete: true },
        (error: VerifyErrors | null, decodedToken: Jwt | undefined) => {
          if (error) {
            res.status(401).json({
              success: false,
              message:
                "User doesn't have a permission to access this route. Refresh token is not valid!",
            })
          } else {
            if (decodedToken) {
              req.decodedRefreshToken = decodedToken

              next()
            } else {
              res.status(500).json({
                success: false,
                message: 'Decoded refresh token is undefined!',
              })
            }
          }
        }
      )
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

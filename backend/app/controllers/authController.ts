import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'

import UserService from '../services/api/userService'
import { UserSearchCriteria } from '../enums/UserSearchCriteria.enum'

import type { Request, Response } from 'express'
import type { JwtPayloadResponse } from '../types/responses/JwtPayloadResponse.type'

const userService = new UserService()

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    await userService.createUser(req.body)

    res
      .status(201)
      .json({ success: true, messege: 'User successfully registered' })
  }
)

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { loginIdentifier, password } = req.body

  const user = await userService.findUser(
    UserSearchCriteria.loginIdentifier,
    loginIdentifier
  )

  if (!user) {
    res.status(404).json({
      success: false,
      message: `User with the username/email: ${loginIdentifier} doesn't exist!`,
    })
  } else {
    const checkPassword = await user?.checkPassword(password)

    if (!checkPassword) {
      res.status(404).json({
        success: false,
        message: `User with provided password doesn't exist!`,
      })
    } else {
      const accessToken = user?.generateToken()
      const refreshToken = user?.generateRefreshToken()

      res.status(200).json({
        success: true,
        message: 'User successfully logged in!',
        token: accessToken,
        refreshToken,
      })
    }
  }
})

export const refreshToken = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.decodedRefreshToken as JwtPayloadResponse

    jwt.sign(
      { id },
      process.env.JWT_ACCESS_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRES },
      (error: Error | null, encodedToken: string | undefined) => {
        if (error) {
          res.status(500).json({
            success: false,
            message: 'Error occured while trying to asign new access token',
          })
        } else {
          res.status(200).json({
            success: true,
            token: encodedToken,
          })
        }
      }
    )
  }
)

export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res
    .status(200)
    .json({ success: true, message: 'User successfully logged out!' })
})

export const getLoggedUser = asyncHandler(
  async (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: `User successfully retrieved from the database!`,
      data: req.user,
    })
  }
)

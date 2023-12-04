import asyncHandler from 'express-async-handler'
import UserService from '../services/api/userService'
import { UserSearchCriteria } from '../enums/UserSearchCriteria.enum'

import type { Request, Response } from 'express'

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
  const { email, password } = req.body

  const user = await userService.findUser(UserSearchCriteria.email, email)

  if (!user) {
    res.status(401).json({
      success: false,
      message: `User with the email ${email} doesn't exist!`,
    })
  }

  const checkPassword = await user?.checkPassword(password)

  if (!checkPassword) {
    res.status(401).json({
      success: false,
      message: `User with the password ${checkPassword} doesn't exist!`,
    })
  } else {
    const token = user?.generateToken()

    res.status(200).json({
      success: true,
      message: 'User successfully logged in!',
      token,
    })
  }
})

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

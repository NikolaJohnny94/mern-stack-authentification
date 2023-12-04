import { Request, Response, NextFunction } from 'express'
import { MongoError } from 'mongodb'
import { Error as MongooseError } from 'mongoose'

type CustomError = MongoError | MongooseError

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500
  let message = err.message || 'Internal Server Error'

  if (res.headersSent) return next(err)

  if (err instanceof MongooseError.CastError && err.name === 'CastError')
    statusCode = 404

  if (
    err instanceof MongooseError.ValidationError &&
    err.name === 'ValidationError'
  )
    statusCode = 400

  if (err instanceof MongoError && err.code === 11000) statusCode = 409

  res.status(statusCode).json({ success: false, message, error: err })
}

export default errorHandler

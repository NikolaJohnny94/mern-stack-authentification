import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import type { User } from '../types/User.type'

const userSchema = new Schema<User>(
  {
    username: {
      type: String,
      required: [true, 'Please add value for username field'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Please add value for email field'],
      unique: true,
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        'Please add a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please add value for password field'],
      minlength: 8,
      select: false,
      validate: {
        validator: function (v: string) {
          return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(v)
        },
        message: (props: { value: string }) =>
          `${props.value} is not a valid password!\n The password should be at least 8 characters long, contain at least 8 characters long, contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character`,
      },
    },
    role: {
      type: String,
      default: 'user',
    },
  },
  {
    collection: 'users',
  }
)

userSchema.set('timestamps', true)

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  }
  next()
})

userSchema.methods.generateToken = function () {
  const token = jwt.sign({ id: this._id }, `${process.env.JWT_ACCESS_SECRET}`, {
    expiresIn: process.env.JWT_EXPIRES,
  })
  return token
}

userSchema.methods.generateRefreshToken = function () {
  const token = jwt.sign({ id: this._id }, `${process.env.JWT_REFRESH_SECRET}`)
  return token
}

userSchema.methods.checkPassword = async function (providedPassword: string) {
  const passwordMatch = await bcrypt.compare(providedPassword, this.password)
  return passwordMatch
}

const userModel = model<User>('user', userSchema)

export default userModel

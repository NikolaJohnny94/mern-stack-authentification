import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import homeRouter from './routes'
import authRouter from './routes/authRouter'
import connectDB from './db'
import errorHandler from './middleware/errorHandler'

config()

connectDB()

const app = express()

app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(express.json())

app.use(homeRouter)
app.use('/api/auth', authRouter)

app.use(errorHandler)

app.listen(process.env.PORT, () => {
  console.log(`App is running on http://localhost:${process.env.PORT}`)
})

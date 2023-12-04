import { connect } from 'mongoose'

const connectDB = async (): Promise<void> => {
  await connect(`${process.env.MONGO_URL}`)
  console.log('MongoDB is connected...')
}

export default connectDB

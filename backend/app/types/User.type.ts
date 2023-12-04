export type User = {
  _id?: string
  username: string
  email: string
  password: string
  role: string
  generateToken: () => string
  checkPassword: (providedPassword: string) => boolean
}

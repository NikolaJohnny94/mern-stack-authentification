export type AuthState = {
  loggedInSuccessfully: boolean | null
  registeredSuccessfully: boolean
  error: string | null
  loading: boolean
  user: any | null
}

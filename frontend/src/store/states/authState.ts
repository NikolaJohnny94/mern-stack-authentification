import type { AuthState } from '../../types'

export const initialState: AuthState = {
  loggedInSuccessfully: null,
  registeredSuccessfully: false,
  error: null,
  loading: false,
  user: null,
}

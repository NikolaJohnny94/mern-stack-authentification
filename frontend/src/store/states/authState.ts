import type { AuthState } from '../../types'

export const initialState: AuthState = {
  registeredSuccessfully: false,
  loading: false,
  user: null,
  error: null,
}

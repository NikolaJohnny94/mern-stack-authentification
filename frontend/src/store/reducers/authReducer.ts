import { createSlice } from '@reduxjs/toolkit'

import { initialState } from '../states/authState'
import { login, registration, logout, getUser } from '../thunks/authThunks'

import type { PayloadAction } from '@reduxjs/toolkit'
import type {
  AuthState,
  LoginResponse,
  RegistrationResponse,
  LogoutResponse,
  UserResponse,
} from '../../types/index'

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state: AuthState) => {
      state.error = null
    },
    resetRegisteredSuccessfully: (state: AuthState) => {
      state.registeredSuccessfully = false
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          if (action.payload.success) {
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('refreshToken', action.payload.refreshToken)
            state.loading = false
          } else {
            state.loading = false
          }
        }
      )
      .addCase(login.pending, (state) => {
        state.loading = true
      })
      .addCase(
        login.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false
          if (action.payload) {
            state.error = action.payload
          } else {
            state.error =
              'Error occured while trying to login user. No additional info was provided.'
          }
        }
      )
      // Registration
      .addCase(
        registration.fulfilled,
        (state, action: PayloadAction<RegistrationResponse>) => {
          if (action.payload.success) {
            state.registeredSuccessfully = true
            state.loading = false
          } else {
            state.registeredSuccessfully = false
            state.loading = false
          }
        }
      )
      .addCase(registration.pending, (state) => {
        state.loading = true
      })
      .addCase(
        registration.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false
          if (action.payload) {
            state.error = action.payload
          } else {
            state.error =
              'Error occured while trying to register new user. No additional info was provided'
          }
        }
      )
      // Logout
      .addCase(
        logout.fulfilled,
        (state, action: PayloadAction<LogoutResponse>) => {
          if (action.payload.success) {
            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
            state.loading = false
            state.user = null
          }
        }
      )
      .addCase(logout.pending, (state) => {
        state.loading = true
      })
      // Get User
      .addCase(
        getUser.fulfilled,
        (state, action: PayloadAction<UserResponse>) => {
          if (action.payload.success) {
            state.loading = false
            state.user = action.payload.data
          } else {
            state.loading = false
            state.user = null
          }
        }
      )
      .addCase(getUser.pending, (state) => {
        state.loading = true
      })
      .addCase(
        getUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false
          if (action.payload) {
            state.error = action.payload
          } else {
            state.error =
              'Error occured while trying to get user from the database. No additional info was provided.'
          }
        }
      )
  },
})

export default authSlice

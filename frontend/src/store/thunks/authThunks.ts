import { createAsyncThunk } from '@reduxjs/toolkit'

import AuthService from '../services/api/authService'

import type {
  LoginResponse,
  RegistrationResponse,
  AuthInputData,
  LogoutResponse,
  UserResponse,
} from '../../types/index'

const authService = new AuthService()

export const registration = createAsyncThunk<
  RegistrationResponse,
  AuthInputData,
  { rejectValue: string }
>('auth/registration', async (loginInputData, thunkAPI) => {
  try {
    const response = await authService.registration(loginInputData)
    const data = await response.json()

    if (!data.success) {
      return thunkAPI.rejectWithValue(data.message)
    } else {
      return data
    }
  } catch (e: any) {
    let error: Error = e
    return thunkAPI.rejectWithValue(error.message)
  }
})

export const login = createAsyncThunk<
  LoginResponse,
  AuthInputData,
  { rejectValue: string }
>('auth/login', async (loginInputData, thunkAPI) => {
  try {
    const response = await authService.login(loginInputData)
    const data = await response.json()

    if (!data.success) {
      return thunkAPI.rejectWithValue(data.message)
    } else {
      return data
    }
  } catch (e: any) {
    let error: Error = e
    return thunkAPI.rejectWithValue(error.message)
  }
})

export const logout = createAsyncThunk<
  LogoutResponse,
  void,
  { rejectValue: string }
>('auth/logout', async (_, thunkAPI) => {
  try {
    const response = await authService.logout()
    const data = await response.json()

    if (!data.success) {
      return thunkAPI.rejectWithValue(data.message)
    } else {
      return data
    }
  } catch (e: any) {
    let error: Error = e
    return thunkAPI.rejectWithValue(error.message)
  }
})

export const getUser = createAsyncThunk<
  UserResponse,
  void,
  { rejectValue: string }
>('user/get-user', async (_, thunkAPI) => {
  try {
    const response = await authService.getUser()
    const data = await response.json()

    if (!data.success) {
      return thunkAPI.rejectWithValue(data.message)
    } else {
      return data
    }
  } catch (e: any) {
    let error: Error = e
    return thunkAPI.rejectWithValue(error.message)
  }
})

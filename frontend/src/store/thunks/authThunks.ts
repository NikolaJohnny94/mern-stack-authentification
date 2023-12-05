import { createAsyncThunk } from '@reduxjs/toolkit'

import AuthService from '../../services/auth'

import type { AxiosError } from 'axios'
import type {
  LoginInputData,
  LoginResponse,
  RegistrationInputData,
  RegistrationResponse,
  LogoutResponse,
  UserResponse,
  ErrorDataResponse,
} from '../../types/index'

const authService = new AuthService()

export const registration = createAsyncThunk<
  RegistrationResponse,
  RegistrationInputData,
  { rejectValue: string }
>('auth/registration', async (loginInputData, thunkAPI) => {
  try {
    const { data } = await authService.registration(loginInputData)

    if (!data.success) {
      return thunkAPI.rejectWithValue(data.message)
    } else {
      return data
    }
  } catch (e: any) {
    let error: AxiosError = e
    let errorMessage: string

    if ((error.response?.data as ErrorDataResponse).message) {
      errorMessage = (error.response?.data as ErrorDataResponse).message
    } else {
      errorMessage = error.message
    }

    return thunkAPI.rejectWithValue(errorMessage)
  }
})

export const login = createAsyncThunk<
  LoginResponse,
  LoginInputData,
  { rejectValue: string }
>('auth/login', async (loginInputData, thunkAPI) => {
  try {
    const { data } = await authService.login(loginInputData)

    if (!data.success) {
      console.log(data)
      return thunkAPI.rejectWithValue(data.message)
    } else {
      return data
    }
  } catch (e: any) {
    let error: AxiosError = e
    let errorMessage: string

    if ((error.response?.data as ErrorDataResponse).message) {
      errorMessage = (error.response?.data as ErrorDataResponse).message
    } else {
      errorMessage = error.message
    }

    return thunkAPI.rejectWithValue(errorMessage)
  }
})

export const logout = createAsyncThunk<
  LogoutResponse,
  void,
  { rejectValue: string }
>('auth/logout', async (_, thunkAPI) => {
  try {
    const { data } = await authService.logout()

    if (!data.success) {
      return thunkAPI.rejectWithValue(data.message)
    } else {
      return data
    }
  } catch (e: any) {
    let error: AxiosError = e
    let errorMessage: string

    if ((error.response?.data as ErrorDataResponse).message) {
      errorMessage = (error.response?.data as ErrorDataResponse).message
    } else {
      errorMessage = error.message
    }

    return thunkAPI.rejectWithValue(errorMessage)
  }
})

export const getUser = createAsyncThunk<
  UserResponse,
  void,
  { rejectValue: string }
>('user/get-user', async (_, thunkAPI) => {
  try {
    const { data } = await authService.getUser()

    if (!data.success) {
      return thunkAPI.rejectWithValue(data.message)
    } else {
      return data
    }
  } catch (e: any) {
    let error: AxiosError = e
    let errorMessage: string

    if ((error.response?.data as ErrorDataResponse).message) {
      errorMessage = (error.response?.data as ErrorDataResponse).message
    } else {
      errorMessage = error.message
    }

    return thunkAPI.rejectWithValue(errorMessage)
  }
})

import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { login } from '../../store/thunks/authThunks'
import { authSelector } from '../../store/selectors/authSelector'
import { clearError } from '../../store/actions/authActions'

import type { AppDispatch, AuthInputData } from '../../types'

export const Login = () => {
  const [loginData, setLoginData] = useState({} as AuthInputData)

  const dispatch = useDispatch<AppDispatch>()

  const auth = useSelector(authSelector)

  const { loading, loggedInSuccessfully, user, error } = auth

  useEffect(() => {
    if (error !== null) {
      setTimeout(() => {
        dispatch(clearError())
      }, 3000)
    }
  }, [error])

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setLoginData((prevState: AuthInputData) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const loginUser = (): void => {
    dispatch(
      login({
        email: loginData.email,
        password: loginData.password,
      })
    )
  }

  if (loading) {
    return (
      <span className='block m-auto loading loading-bars loading-lg'></span>
    )
  }

  if (
    loggedInSuccessfully === null &&
    user === null &&
    localStorage.getItem('token')
  ) {
    return <Navigate to='/user' />
  }

  if (loggedInSuccessfully && user === null) {
    return <Navigate to='/user' />
  }

  return (
    <div className='mt-[65px]'>
      {error !== null && (
        <div className='toast toast-top toast-center mt-[55px]'>
          <div className='alert alert-error text-white'>
            <span>{error}</span>
          </div>
        </div>
      )}
      <h2 className='text-center text-2xl p-3 m-4'>Login</h2>
      <div className='flex flex-col justify-center items-center w-[400px] m-auto'>
        <input
          type='text'
          name='email'
          placeholder='Type your email here'
          className='input input-bordered w-full max-w-xs'
          onChange={onInputChange}
        />
        <br />
        <input
          type='password'
          name='password'
          placeholder='Type your password here'
          className='input input-bordered w-full max-w-xs'
          onChange={onInputChange}
        />

        <button className='btn btn-active btn-neutral mt-5' onClick={loginUser}>
          Submit
        </button>
      </div>
    </div>
  )
}

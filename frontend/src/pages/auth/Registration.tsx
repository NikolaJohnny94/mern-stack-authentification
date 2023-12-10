import { useEffect, useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { registration } from '../../store/thunks/authThunks'
import { authSelector } from '../../store/selectors/authSelector'
import { clearError } from '../../store/actions/authActions'

import checkIfTokenExists from '../../utils/checkIfTokenExists'

import type { ChangeEvent, FormEvent } from 'react'
import type { AppDispatch, RegistrationInputData } from '../../types'

export const Registration = () => {
  const [registrationData, setRegistrationData] = useState(
    {} as RegistrationInputData
  )
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const auth = useSelector(authSelector)

  const { loading, registeredSuccessfully, error } = auth

  useEffect(() => {
    if (error !== null) {
      setTimeout(() => {
        dispatch(clearError())
      }, 3000)
    }
  }, [error])

  useEffect(() => {
    if (registeredSuccessfully) {
      navigate('/login')
    }
  }, [registeredSuccessfully])

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setRegistrationData((prevState: RegistrationInputData) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const registerUser = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    dispatch(
      registration({
        username: registrationData.username,
        email: registrationData.email,
        password: registrationData.password,
      })
    )
    setRegistrationData({} as RegistrationInputData)
  }

  if (loading) {
    return (
      <span className='block m-auto loading loading-bars loading-lg'></span>
    )
  }

  if (checkIfTokenExists()) {
    return <Navigate to='/user' />
  }

  return (
    <form className='mt-[65px]' onSubmit={registerUser}>
      {error !== null && (
        <div className='toast toast-top toast-center mt-[55px]'>
          <div className='alert alert-error text-white'>
            <span>{error}</span>
          </div>
        </div>
      )}
      <h2 className='text-center text-2xl p-3 m-4'>Registration</h2>
      <div className='flex flex-col justify-center items-center w-[400px] m-auto'>
        <input
          type='text'
          name='username'
          placeholder='Enter your username'
          className='input input-bordered w-full max-w-xs'
          onChange={onInputChange}
        />
        <br />
        <input
          type='email'
          name='email'
          placeholder='Enter your email'
          className='input input-bordered w-full max-w-xs'
          onChange={onInputChange}
        />
        <br />
        <input
          type='password'
          name='password'
          placeholder='Enter your password'
          className='input input-bordered w-full max-w-xs'
          onChange={onInputChange}
        />
        <button type='submit' className='btn btn-active btn-neutral mt-5'>
          Submit
        </button>
      </div>
    </form>
  )
}

export default Registration

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useFormik } from 'formik'

import { login } from '../../store/thunks/authThunks'
import { authSelector } from '../../store/selectors/authSelector'
import {
  clearError,
  resetRegisteredSuccessfully,
} from '../../store/actions/authActions'

import loginValidationSchema from '../../schemas/validation/loginValidationSchema'
import checkIfTokenExists from '../../utils/checkIfTokenExists'

import type { AppDispatch, LoginInputData } from '../../types'

export const Login = () => {
  const dispatch = useDispatch<AppDispatch>()

  const auth = useSelector(authSelector)
  const { loading, error, registeredSuccessfully } = auth

  const formik = useFormik<LoginInputData>({
    initialValues: {
      loginIdentifier: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      const { loginIdentifier, password } = values

      dispatch(
        login({
          loginIdentifier,
          password,
        })
      )
    },
  })

  useEffect(() => {
    if (error !== null) {
      setTimeout(() => {
        dispatch(clearError())
      }, 5000)
    }
  }, [error])

  useEffect(() => {
    if (registeredSuccessfully) {
      dispatch(resetRegisteredSuccessfully())
    }
  }, [registeredSuccessfully])

  if (loading) {
    return (
      <span className='block m-auto loading loading-bars loading-lg'></span>
    )
  }

  if (checkIfTokenExists()) {
    return <Navigate to='/user' />
  }

  return (
    <form className='mt-[65px]' onSubmit={formik.handleSubmit}>
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
          id='loginIdentifier'
          type='text'
          name='loginIdentifier'
          placeholder='Enter your username or email'
          className='input input-bordered w-full max-w-xs'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.loginIdentifier}
        />
        {formik.touched.loginIdentifier && formik.errors.loginIdentifier && (
          <span className='text-red-500 pt-3'>
            {formik.errors.loginIdentifier}
          </span>
        )}
        <br />
        <input
          id='password'
          type='password'
          name='password'
          placeholder='Enter your password'
          className='input input-bordered w-full max-w-xs'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password && (
          <span className='text-red-500 pt-3'>{formik.errors.password}</span>
        )}
        <button type='submit' className='btn btn-active btn-neutral mt-5'>
          Submit
        </button>
      </div>
    </form>
  )
}

import { useEffect } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'

import { registration } from '../../store/thunks/authThunks'
import { authSelector } from '../../store/selectors/authSelector'
import { clearError } from '../../store/actions/authActions'

import registrationValidationSchema from '../../schemas/validation/registrationValidationSchema'
import { checkIfTokenExists } from '../../utils'

import { LoadingSpinner, ValidationError } from '../../components'

import type { AppDispatch, RegistrationInputData } from '../../types'

export const Registration = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const auth = useSelector(authSelector)
  const { loading, registeredSuccessfully, error } = auth

  const formik = useFormik<RegistrationInputData & { confirmPassword: string }>(
    {
      initialValues: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      validationSchema: registrationValidationSchema,
      onSubmit: (values) => {
        const { username, email, password } = values
        dispatch(
          registration({
            username,
            email,
            password,
          })
        )
      },
    }
  )

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

  if (loading) {
    return <LoadingSpinner />
  }

  if (checkIfTokenExists()) {
    return <Navigate to='/user' />
  }

  return (
    <form className='mt-[45px]' onSubmit={formik.handleSubmit}>
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
          id='username'
          type='text'
          name='username'
          placeholder='Enter your username'
          className='input input-bordered w-full max-w-xs'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username && (
          <ValidationError message={formik.errors.username} />
        )}
        <br />
        <input
          id='email'
          type='email'
          name='email'
          placeholder='Enter your email'
          className='input input-bordered w-full max-w-xs'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email && (
          <ValidationError message={formik.errors.email} />
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
          <ValidationError message={formik.errors.password} />
        )}
        <br />
        <input
          id='confirmPassword'
          type='password'
          name='confirmPassword'
          placeholder='Confirm your passowrd'
          className='input input-bordered w-full max-w-xs'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <ValidationError message={formik.errors.confirmPassword} />
        )}
        <button type='submit' className='btn btn-active btn-neutral mt-5'>
          Submit
        </button>
      </div>
    </form>
  )
}

export default Registration

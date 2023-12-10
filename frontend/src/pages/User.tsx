import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { getUser } from '../store/thunks/authThunks'
import { authSelector } from '../store/selectors/authSelector'

import type { AppDispatch } from '../types'

export const User = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const auth = useSelector(authSelector)

  const { loading, user, error } = auth

  useEffect(() => {
    dispatch(getUser())
    if (error) {
      navigate('/login')
    }
  }, [error])

  if (loading) {
    return (
      <span className='block m-auto loading loading-bars loading-lg mt-[100px]'></span>
    )
  }

  return (
    <div className='mt-[50px]'>
      <h1 className='text-center text-3xl'>
        Welcome, <strong>{user?.email}</strong>
      </h1>
    </div>
  )
}

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { getUser } from '../store/thunks/authThunks'
import { authSelector } from '../store/selectors/authSelector'

import { LoadingSpinner } from '../components'

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
    return <LoadingSpinner />
  }

  return (
    <div className='mt-[50px]'>
      <h1 className='text-center text-3xl'>
        Welcome, <strong>{user?.email}</strong>
      </h1>
    </div>
  )
}

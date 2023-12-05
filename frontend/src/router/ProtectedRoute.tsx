import { Navigate } from 'react-router-dom'

import getTokenFromLocalStorage from '../utils/getTokenFromLocalStorage'

import type { ReactElement, FC } from 'react'

type Props = {
  children: ReactElement
}

const ProtectedRoute: FC<Props> = ({ children }) => {
  if (getTokenFromLocalStorage()) {
    return children || null
  }

  return <Navigate to='/login' />
}

export default ProtectedRoute

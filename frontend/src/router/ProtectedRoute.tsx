import { Navigate } from 'react-router-dom'

import type { ReactElement, FC } from 'react'

type Props = {
  children: ReactElement
}

const ProtectedRoute: FC<Props> = ({ children }) => {
  if (localStorage.getItem('token')) {
    return children || null
  }

  return <Navigate to='/login' />
}

export default ProtectedRoute

import { Navigate } from 'react-router-dom'

import { checkIfTokenExists } from '../utils'

import type { ReactElement, FC } from 'react'

type Props = {
  children: ReactElement
}

const ProtectedRoute: FC<Props> = ({ children }) => {
  if (checkIfTokenExists()) {
    return children || null
  }

  return <Navigate to='/login' />
}

export default ProtectedRoute

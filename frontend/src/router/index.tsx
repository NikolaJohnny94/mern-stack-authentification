import { createBrowserRouter, Navigate } from 'react-router-dom'

import Layout from '../layout'
import ProtectedRoute from './ProtectedRoute'
import { Login, Registration, User } from '../pages'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Navigate to='/login' />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/registration',
        element: <Registration />,
      },
      {
        path: '/user',
        element: (
          <ProtectedRoute>
            <User />
          </ProtectedRoute>
        ),
      },
    ],
  },
])

export default router

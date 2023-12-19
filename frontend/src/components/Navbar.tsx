import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { logout } from '../store/thunks/authThunks'
import { authSelector } from '../store/selectors/authSelector'

import checkIfTokenExists from '../utils/checkIfTokenExists'

export const Navbar = () => {
  const dispatch = useDispatch<any>()
  const navigate = useNavigate()

  const auth = useSelector(authSelector)
  const { user } = auth

  const logoutUser = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <div className='navbar bg-base-100'>
      <div className='flex-1'>
        <Link className='btn btn-ghost text-xl' to='/user'>
          {checkIfTokenExists() && (
            <>
              <svg
                fill='currentColor'
                viewBox='0 0 16 16'
                height='1.7rem'
                width='1.7rem'
              >
                <path d='M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 100-6 3 3 0 000 6z' />
              </svg>
              {user?.username}
              {}
            </>
          )}
        </Link>
      </div>
      <div className='flex-none'>
        <ul className='menu menu-horizontal px-1'>
          {checkIfTokenExists() ? (
            <li onClick={logoutUser}>
              <a>Logout</a>
            </li>
          ) : (
            <>
              <li>
                <Link to='/login'>Login</Link>
              </li>
              <li>
                <Link to='/registration'>Registration</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}

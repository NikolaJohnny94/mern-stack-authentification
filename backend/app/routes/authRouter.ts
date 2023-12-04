import { Router } from 'express'
import { protectedRoute } from '../middleware/auth'
import {
  registerUser,
  loginUser,
  logoutUser,
  getLoggedUser,
} from '../controllers/authController'

const router = Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(protectedRoute, logoutUser)
router.route('/me').get(protectedRoute, getLoggedUser)

export default router

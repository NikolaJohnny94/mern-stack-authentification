import { Router } from 'express'
import { protectedRoute, protectedRefreshTokenRoute } from '../middleware/auth'
import {
  registerUser,
  loginUser,
  logoutUser,
  getLoggedUser,
  refreshToken,
} from '../controllers/authController'

const router = Router()

router.route('/registration').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(protectedRoute, logoutUser)
router.route('/me').get(protectedRoute, getLoggedUser)
router.route('/refresh-token').post(protectedRefreshTokenRoute, refreshToken)

export default router

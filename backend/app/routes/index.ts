import { Router } from 'express'

const router = Router()

router.route('/').get((req, res) => {
  res.redirect('/api')
})

export default router

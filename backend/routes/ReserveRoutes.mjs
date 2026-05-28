import express from 'express'
import ReserveControllers from '../controllers/ReserveControllers.mjs'
import protect from '../middleware/authMiddleware.mjs'

const router = express.Router()

router.post('/add', protect, ReserveControllers.reserve)
router.get('/get', protect, ReserveControllers.getReserve)
router.put('/:id', protect, ReserveControllers.updateReserve)
router.delete('/:id', protect, ReserveControllers.deleteReserve)

export default router
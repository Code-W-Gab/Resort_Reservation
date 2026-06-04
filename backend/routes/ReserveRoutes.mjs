import express from 'express'
import ReserveControllers from '../controllers/ReserveControllers.mjs'
import protect from '../middleware/authMiddleware.mjs'
import { writeLimiter } from '../middleware/rateLimiter.mjs';

const router = express.Router()

router.post('/add', protect, writeLimiter, ReserveControllers.reserve)
router.get('/get', protect, ReserveControllers.getReserve)
router.put('/:id', protect, ReserveControllers.updateReserve)
router.delete('/:id', protect, ReserveControllers.deleteReserve)

export default router
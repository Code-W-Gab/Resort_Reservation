import express from 'express'
import ReserveControllers from '../controllers/ReserveControllers.mjs'
import protect from '../middleware/authMiddleware.mjs'
import { readLimiter, writeLimiter, deleteLimiter } from '../middleware/rateLimiter.mjs';

const router = express.Router()

router.post('/add', protect, writeLimiter, ReserveControllers.reserve)
router.get('/get', protect, readLimiter, ReserveControllers.getReserve)  
router.put('/:id', protect, writeLimiter, ReserveControllers.updateReserve)  
router.delete('/:id', protect, deleteLimiter, ReserveControllers.deleteReserve) 

export default router
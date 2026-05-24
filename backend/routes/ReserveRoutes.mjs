import express from 'express'
import ReserveControllers from '../controllers/Cottage/ReserveControllers.mjs'

const router = express.Router()

router.post('/add', ReserveControllers.reserve)
router.get('/get', ReserveControllers.getReserve)
router.put('/update/:id', ReserveControllers.updateReserve)

export default router
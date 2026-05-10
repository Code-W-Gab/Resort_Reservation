import express from 'express'
import ReserveControllers from '../controllers/Cottage/ReserveControllers.mjs'

const router = express.Router()

router.post('/add', ReserveControllers.reserve)

export default router
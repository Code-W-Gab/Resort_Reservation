import express from 'express'
import CottageController from '../controllers/Cottage/CottageControllers.mjs'

const router = express.Router()

router.post('/add', CottageController.addCottage)

export default router
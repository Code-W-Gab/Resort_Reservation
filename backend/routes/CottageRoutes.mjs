import express from 'express'
import CottageController from '../controllers/Cottage/CottageControllers.mjs'

const router = express.Router()

router.post('/add', CottageController.addCottage)
router.get('/get', CottageController.getCottage)
router.delete('/delete/:id', CottageController.deleteCottage)
router.put('/update/:id', CottageController.updateCottage)

export default router
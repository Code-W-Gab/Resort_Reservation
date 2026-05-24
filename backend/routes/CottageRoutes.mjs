import express from 'express'
import upload from '../middleware/uploadMiddleware.mjs'
import CottageController from '../controllers/Cottage/CottageControllers.mjs'

const router = express.Router()

router.post('/add', upload.array('images', 5), CottageController.addCottage)
router.get('/get', CottageController.getCottage)
router.get('/get/:id', CottageController.getCottageById)
router.delete('/delete/:id', CottageController.deleteCottage)
router.put('/update/:id', upload.array('images', 5), CottageController.updateCottage)

export default router
import express from 'express';
import upload from '../middleware/uploadMiddleware.mjs';
import CottageController from '../controllers/CottageControllers.mjs';
import protect from '../middleware/authMiddleware.mjs';
import authorize from '../middleware/roleMiddleware.mjs';

const router = express.Router()

// User
router.get('/get', CottageController.getCottage)
router.get('/get/:id', CottageController.getCottageById)
// Admin
router.post('/add', protect, authorize('admin'), upload.array('images', 5), CottageController.addCottage)
router.delete('/delete/:id', protect, authorize('admin'), CottageController.deleteCottage)
router.put('/update/:id', protect, authorize('admin'), upload.array('images', 5), CottageController.updateCottage)

export default router
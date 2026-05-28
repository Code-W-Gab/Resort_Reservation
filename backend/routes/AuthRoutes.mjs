import { Router } from "express";
import { registerRules, loginRules } from '../middleware/validationMiddleware.mjs'
import AuthControllers from "../controllers/AuthControllers.mjs";
import protect from "../middleware/authMiddleware.mjs";
import authorize from "../middleware/roleMiddleware.mjs";

const router = Router()

router.post('/register', registerRules, AuthControllers.Register)
router.post('/login', loginRules, AuthControllers.Login)
router.post('/logout', AuthControllers.logout)
router.get('/me', protect, AuthControllers.getMe)
// router.get('/profile', protect, AuthControllers.getProfile)
// router.get('/user', protect, authorize('user'), AuthControllers.userPage)
// router.get('/admin', protect, authorize('admin'), AuthControllers.adminPage)

export default router
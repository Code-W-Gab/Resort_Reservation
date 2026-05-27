import { Router } from "express";
import { registerRules, loginRules } from '../middleware/validationMiddleware.mjs'
import AuthControllers from "../controllers/AuthControllers.mjs";
import protect from "../middleware/authMiddleware.mjs";

const router = Router()

router.post('/register', registerRules, AuthControllers.Register)
router.post('/login', loginRules, AuthControllers.Login)
router.get('/profile', protect, AuthControllers.getProfile)
router.post('/logout', AuthControllers.logout)

export default router
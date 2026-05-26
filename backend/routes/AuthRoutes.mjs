import { Router } from "express";
import { registerRules, loginRules } from '../middleware/validationMiddleware.mjs'
import AuthControllers from "../controllers/AuthControllers.mjs";

const router = Router()

router.post('/register', registerRules, AuthControllers.Register)
router.post('/login', loginRules, AuthControllers.Login)

export default router
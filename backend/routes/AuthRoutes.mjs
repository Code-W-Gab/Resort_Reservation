import { Router } from "express";
import { registerRules, loginRules } from '../middleware/validationMiddleware.mjs'
import AuthControllers from "../controllers/AuthControllers.mjs";
import protect from "../middleware/authMiddleware.mjs";
import authorize from "../middleware/roleMiddleware.mjs";
import passport from "passport";

const router = Router()

router.post('/register', registerRules, AuthControllers.Register)
router.post('/login', loginRules, AuthControllers.Login)
router.post('/logout', AuthControllers.logout)
router.get('/me', protect, AuthControllers.getMe)
router.post('/verify-email', AuthControllers.verifyEmail)
router.post('/resend-otp', AuthControllers.resendOTP)
// router.get('/profile', protect, AuthControllers.getProfile)
// router.get('/user', protect, authorize('user'), AuthControllers.userPage)
// router.get('/admin', protect, authorize('admin'), AuthControllers.adminPage)

// Google OAuth Routes
// START GOOGLE LOGIN
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
// GOOGLE CALLBACK
router.get('/google/callback', passport.authenticate('google', { session: false }), AuthControllers.googleLogin)

export default router
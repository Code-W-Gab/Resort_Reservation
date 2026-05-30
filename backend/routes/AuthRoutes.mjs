import { Router } from "express";
import { registerRules, loginRules } from '../middleware/validationMiddleware.mjs'
import AuthControllers from "../controllers/AuthControllers.mjs";
import protect from "../middleware/authMiddleware.mjs";
import authorize from "../middleware/roleMiddleware.mjs";
import passport from "passport";
import { readLimiter, writeLimiter } from "../middleware/rateLimiter.mjs";

const router = Router()

router.post('/register', registerRules, writeLimiter, AuthControllers.Register)
router.post('/login', loginRules, writeLimiter, AuthControllers.Login)
router.post('/logout', writeLimiter, AuthControllers.logout)
router.get('/me', protect, readLimiter, AuthControllers.getMe)
router.post('/verify-email', writeLimiter, AuthControllers.verifyEmail)
router.post('/resend-otp', writeLimiter, AuthControllers.resendOTP)
// router.get('/profile', protect, AuthControllers.getProfile)
// router.get('/user', protect, authorize('user'), AuthControllers.userPage)
// router.get('/admin', protect, authorize('admin'), AuthControllers.adminPage)

// Google OAuth Routes
// START GOOGLE LOGIN
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
// GOOGLE CALLBACK
router.get('/google/callback', passport.authenticate('google', { session: false }), AuthControllers.googleLogin)

export default router
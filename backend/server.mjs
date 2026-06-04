import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.mjs'
import CottageRoutes from './routes/CottageRoutes.mjs'
import ReserveRoutes from './routes/ReserveRoutes.mjs'
import AuthRoutes from './routes/AuthRoutes.mjs'
import passport from 'passport'
import setupPassport from './config/passport.mjs'

setupPassport()

const app = express()
const NODE_ENV = process.env.NODE_ENV || 'development'

app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize())
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || "http://localhost:5173",
    'https://resort-reservation.onrender.com',
    /\.vercel\.app$/ 
  ],
  credentials: true,  // Allow credentials
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
}))

app.set('trust proxy', 1)

connectDB()
app.use(express.static('uploads'))

// Routes
app.use('/auth', AuthRoutes)
app.use('/cottage', CottageRoutes)
app.use('/reserve', ReserveRoutes)

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message)
  res.status(err.status || 500).json({ 
    message: NODE_ENV === 'production' ? 'Server error' : err.message 
  });
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server running in ${NODE_ENV} mode on http://localhost:${process.env.PORT || 8080}`)
})
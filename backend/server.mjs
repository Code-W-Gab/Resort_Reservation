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

setupPassport() // Set up Passport strategies

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize()) // Initialize Passport middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
})) 

// MongoDb
connectDB()

app.use(express.static('uploads')) // Serve uploads as static files

// Routes
// Auth
app.use('/auth', AuthRoutes)
// Admin Cottage Routes
app.use('/cottage', CottageRoutes) 
app.use('/reserve', ReserveRoutes)


// Global Error Handler
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
})
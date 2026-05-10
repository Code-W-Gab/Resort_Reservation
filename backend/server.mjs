import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import connectDB from './config/db.mjs'
import CottageRoutes from './routes/CottageRoutes.mjs'
import ReserveRoutes from './routes/ReserveRoutes.mjs'

const app = express()
app.use(express.json())
app.use(cors()) 

// MongoDb
connectDB()

// Routes
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
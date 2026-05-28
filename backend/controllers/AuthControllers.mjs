import AuthSchema from "../models/AuthSchema.mjs";
import { validationResult } from "express-validator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const AuthControllers = {
  async Register (req, res) {
    try {
      // Validation
      const errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(404).json({ errors: errors.array() })

      const { FullName, Email, Password } = req.body
      const userExist = await AuthSchema.findOne({Email})
      if (userExist) return res.status(400).json({
        success: false,
        message: "User already exist"
      })

      // Hashed Password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(Password, salt)

      const user = await AuthSchema.create({
        FullName,
        Email,
        Password: hashedPassword
      })
      res.status(201).json({
        success: true,
        data: user
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  },
  async Login (req, res){
    try {
      // Validation
      const errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(404).json({ errors: errors.array() })

      const { Email, Password } = req.body
      const user = await AuthSchema.findOne({Email})
      if (!user) return res.status(400).json({
        success: false,
        message: "User not found"
      })

      // Compare password
      const isMatch = await bcrypt.compare(Password, user.Password)
      if (!isMatch) return res.status(400).json({
        success: false,
        message: "Invalid Credentials"
      })

      // JWT - creating token
      const token = jwt.sign(
        { 
          id: user._id,
          role: user.Role
        },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
      )

      // store inside cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // true in production (HTTPS)
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        success: true,
        message: "Login successful",
        user: {
          id: user._id,
          name: user.FullName,
          email: user.Email,
          role: user.Role,
        }
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  },
  async getMe (req, res){
    try {
      res.status(200).json({
        message: "Login",
        user: req.user
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  },
  async logout (req, res){
    try {
      res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
      });

      res.json({
        message: "Logged out",
      });
    } catch (error) {
      res.status(500).json({
        success:false,
        message: error.message
      })
    }
  },
  // async userPage (req, res){
  //   res.status(200).json({
  //     message: "welcome user",
  //     role: req.user.role
  //   })
  // }, 
  // async adminPage (req, res){
  //   res.status(200).json({
  //     message: "welcome admin",
  //     role: req.user.role
  //   })
  // }
}

export default AuthControllers
import AuthSchema from "../models/AuthSchema.mjs";
import { validationResult } from "express-validator";
import bcrypt from 'bcrypt';

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

      res.status(200).json({
        success: true,
        message: "Login successful"
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  }
}

export default AuthControllers
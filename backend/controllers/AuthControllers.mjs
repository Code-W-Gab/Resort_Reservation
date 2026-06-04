import AuthSchema from "../models/AuthSchema.mjs";
import { validationResult } from "express-validator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import {generateOTP} from "../middleware/generateOTP.mjs";
import {sendEmail} from '../middleware/sendEmail.mjs';

const AuthControllers = {
  async Register (req, res) {
    try {
      // Validation
      const errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(404).json({ errors: errors.array() })

      const { FullName, Email, Password } = req.body
      const userExist = await AuthSchema.findOne({Email})
      if (userExist && !userExist.isVerified) return res.status(400).json({
        success: false,
        message: "User already exist but not verified. Please check your email for the OTP to verify your account."
      })

      // Hashed Password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(Password, salt)

      // Generate OTP
      const otp = generateOTP()

      // Set OTP expiration time (e.g., 5 minutes)
      const otpExpires = new Date(Date.now() + 5 * 60 * 1000)

      const user = await AuthSchema.create({
        FullName,
        Email,
        Password: hashedPassword,
        verificationCode: otp,
        verificationCodeExpires: otpExpires
      })

      // Send OTP email
      await sendEmail(Email, "Your Verification Code", `Your OTP code is: ${otp}`)
      
      res.status(201).json({
        success: true,
        data: user,
        message: "User registered successfully. Please check your email for the OTP to verify your account."
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

      // Check if email is verified
      if (!user.isVerified) {
        return res.status(400).json({
          success: false,
          message: "Email not verified. Please check your email for the OTP."
        })
      }

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
          role: user.Role.toLowerCase(),
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      )

      // store inside cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // true in production (HTTPS)
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      res.status(200).json({
        success: true,
        message: "Login successful",
        user: {
          id: user._id,
          name: user.FullName,
          email: user.Email,
          role: user.Role.toLowerCase(),
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
      const user = await AuthSchema.findById(req.user.id).select('-password')
      res.status(200).json({
        user: {
          id: user._id,
          name: user.FullName,
          email: user.Email,
          role: user.Role.toLowerCase()
        }
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
        secure: process.env.NODE_ENV === 'production', // true in production (HTTPS)
        sameSite: "lax",
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
  async googleLogin (req, res) {
    // Successful authentication, generate JWT and send to client 
    const user = req.user;
    const token = jwt.sign(
      { 
        id: user._id,
        role: user.Role.toLowerCase(),
        name: user.FullName
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    
    // Store token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // true in production (HTTPS)
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    if (user.Role.toLowerCase() === 'admin') {
      res.redirect('http://localhost:5173/cottage');
    } else {
      res.redirect('http://localhost:5173/home');
    }
  },
  async verifyEmail (req, res) {
    try {
      const { Email, otp } = req.body
      const user = await AuthSchema.findOne({Email})
      if (!user) return res.status(400).json({
        success: false,
        message: "User not found"
      })

      if (user.verificationCode !== otp) {
        return res.status(400).json({
          success: false,
          message: "Invalid OTP"
        })
      }

      if (Date.now() > user.verificationCodeExpires) {
        return res.status(400).json({
          success: false,
          message: "OTP has expired"
        })
      }

      user.isVerified = true
      user.verificationCode = undefined
      user.verificationCodeExpires = undefined
      await user.save()

      res.status(200).json({
        success: true,
        message: "Email verified successfully"
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  },
  async resendOTP (req, res) {
    try {
      const { Email } = req.body
      const user = await AuthSchema.findOne({Email})
      if (!user) return res.status(400).json({
        success: false,
        message: "User not found"
      })  

      // Generate new OTP
      const otp = generateOTP()
      const otpExpires = new Date(Date.now() + 5 * 60 * 1000)

      user.verificationCode = otp
      user.verificationCodeExpires = otpExpires
      await user.save()

      // Send OTP email
      await sendEmail(Email, "Your New Verification Code", `Your new OTP code is: ${otp}`)
      res.status(200).json({
        success: true,
        message: "New OTP sent to your email"
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  },
  async sendContactMessage (req, res) {
    try {
      const { name, email, message } = req.body
      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          message: "All fields are required"
        })
      }

      const emailContent = `
      <h2>New Contact Message From Serenity Resort</h2>
      
      <p><strong>Name:</strong> ${name}</p>
      
      <p><strong>Email:</strong> ${email}</p>
      
      <p><strong>Message:</strong></p>
      
      <p>${message}</p>
      `

      // Send email to admin
      await sendEmail(process.env.EMAIL_USER, "New Contact Message", emailContent)
      res.status(200).json({
        success: true,
        message: "Message sent successfully"
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
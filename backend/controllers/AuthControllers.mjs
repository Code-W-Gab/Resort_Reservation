import AuthSchema from "../models/AuthSchema.mjs";
import { validationResult } from "express-validator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import {generateOTP} from "../middleware/generateOTP.mjs";
import { sendEmail } from '../middleware/sendEmail.mjs';

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
      try {
        const otpEmail = `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; background-color: #f4f4f4; }
                .container { max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 10px; }
                .header { text-align: center; color: #0066cc; margin-bottom: 20px; }
                .otp-box { 
                  background: #f0f8ff; 
                  border: 2px solid #0066cc; 
                  padding: 20px; 
                  text-align: center; 
                  border-radius: 8px; 
                  margin: 20px 0;
                }
                .otp-code { 
                  font-size: 32px; 
                  font-weight: bold; 
                  letter-spacing: 5px; 
                  color: #0066cc;
                  font-family: monospace;
                }
                .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>Serenity Resort</h2>
                </div>
                <p>Hi there,</p>
                <p>Thank you for registering with Serenity Resort! To verify your email address, please use the OTP code below:</p>
                
                <div class="otp-box">
                  <p style="color: #666; margin: 0 0 10px 0;">Your Verification Code</p>
                  <div class="otp-code">${otp}</div>
                </div>
                
                <p style="color: #666; font-size: 14px; text-align: center; ">This code expires in <strong>5 minutes</strong></p>
                <p style="color: #666; font-size: 14px; text-align: center; ">If you didn't create this account, please ignore this email.</p>
                
                <div class="footer">
                  <p>© 2026 Serenity Resort. All rights reserved.</p>
                  <p><a href="https://resort-reservation-ten.vercel.app/" style="color: #0066cc; text-decoration: none;">Visit our website</a></p>
                </div>
              </div>
            </body>
          </html>
        `
        await sendEmail(Email, "Your Serenity Resort Verification Code", otpEmail)
      } catch (emailError) {
        console.error("Failed to send OTP email:", emailError)
        // Optionally, you can choose to delete the user if email sending fails
        await AuthSchema.findByIdAndDelete(user._id)
        return res.status(500).json({
          success: false,
          message: "Failed to send OTP email. Please try registering again."
        })
      }
      
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
          role: user.Role.toLocaleLowerCase(),
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      )

      // store inside cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,  // Must be true for cross-domain
        sameSite: "none",  //  to allow cross-domain
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      res.status(200).json({
        success: true,
        message: "Login successful",
        user: {
          id: user._id,
          name: user.FullName,
          email: user.Email,
          role: user.Role.toLocaleLowerCase(),
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
          role: user.Role.toLocaleLowerCase(),
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
        secure: true, // true in production (HTTPS)
        sameSite: "none", // "none" to allow cross-domain
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
        role: user.Role.toLocaleLowerCase(),
        name: user.FullName
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    
    // Store token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,  // Must be true for cross-domain
      sameSite: "none",  // to allow cross-domain
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    if (user.Role.toLocaleLowerCase() === 'admin') {
      res.redirect(`${process.env.FRONTEND_URL}/cottage`); 
    } else {
      res.redirect(`${process.env.FRONTEND_URL}/home`); 
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
      try {
        const resendEmail = `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; background-color: #f4f4f4; }
                .container { max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 10px; }
                .header { text-align: center; color: #0066cc; margin-bottom: 20px; }
                .otp-box { 
                  background: #f0f8ff; 
                  border: 2px solid #0066cc; 
                  padding: 20px; 
                  text-align: center; 
                  border-radius: 8px; 
                  margin: 20px 0;
                }
                .otp-code { 
                  font-size: 32px; 
                  font-weight: bold; 
                  letter-spacing: 5px; 
                  color: #0066cc;
                  font-family: monospace;
                }
                .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>Serenity Resort</h2>
                </div>
                <p>Hi there,</p>
                <p>Here's your new OTP code to verify your email:</p>
                
                <div class="otp-box">
                  <p style="color: #666; margin: 0 0 10px 0;">Your New Verification Code</p>
                  <div class="otp-code">${otp}</div>
                </div>
                
                <p style="color: #666; font-size: 14px; text-align: center; ">This code expires in <strong>5 minutes</strong></p>
                <p style="color: #999; font-size: 12px; text-align: center; ">If you didn't request this, you can safely ignore this email.</p>
                
                <div class="footer">
                  <p>© 2026 Serenity Resort. All rights reserved.</p>
                </div>
              </div>
            </body>
          </html>
        `
        await sendEmail(Email, "Your New Serenity Resort Verification Code", resendEmail)
      } catch (emailError) {
        console.error("Failed to send OTP email:", emailError)
        return res.status(500).json({
          success: false,
          message: "Failed to send OTP email. Please try again."
        })
      }  

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
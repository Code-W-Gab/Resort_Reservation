import { request } from "express";
import mongoose, { model } from "mongoose";

const AuthSchema = new mongoose.Schema({
  FullName: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  },
  Role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
})

export default mongoose.model('User', AuthSchema)
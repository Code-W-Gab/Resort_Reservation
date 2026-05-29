import { request } from "express";
import mongoose, { model } from "mongoose";

const AuthSchema = new mongoose.Schema({
  FullName: {
    type: String
  },
  Email: {
    type: String,
    unique: true
  },
  GoogleId: {
    type: String,
    unique: true,
    sparse: true
  },
  Avatar: {
    type: String
  },
  Password: {
    type: String
  },
  Role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
})

export default mongoose.model('User', AuthSchema)
import mongoose from "mongoose";

const CottageSchema = new mongoose.Schema({
  CottageName: {
    type: String,
    required: true,
    trim: true
  },
  Type: {
    type: String,
    required: true,
    enum: ["Cottage", "Cabin"],
    default: "Cottage"
  }, 
  Descriptions: {
    type: String,
    required: true,
    trim: true
  },
  Capacity: {
    type: Number,
    required: true
  },
  DayTourPrice: {
    type: Number,
    required: true
  },
  OvernightPrice: {
    type: Number,
    required: true
  },
  Amenities: {
    type: [String],
    required: true,
    default: []
  },
  Images: {
    type: [String],
    default: []
  }
}, { timestamps: true });

export default mongoose.model('Cottage', CottageSchema)
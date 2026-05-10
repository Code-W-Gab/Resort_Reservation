import mongoose from "mongoose";

const ReserveSchema = new mongoose.Schema({
  CottageName: {
    type: String,
    required: true,
    trim: true
  },
  Capacity: {
    type: Number,
    required: true
  },
  // For dayTour bookings
  DayTourDate: {
    type: Date,
    default: null
  },
  // For overnight bookings
  CheckInDate: {
    type: Date,
    default: null
  },
  CheckOutDate: {
    type: Date,
    default: null
  },
  FullName: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Phone: {
    type: Number,
    required: true
  },
  Total: {
    type: Number,
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Reserve', CottageSchema)
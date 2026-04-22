import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost/ResortReservation");
    console.log("MongoDB is Connected");
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

export default connectDB;
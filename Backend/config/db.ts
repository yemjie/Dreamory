import mongoose from "mongoose";

export default async function connectDb() {
    try {
      await mongoose.connect(String(process.env.MONGO_URI),{});
      console.log('Mongoose connected to ' + process.env.MONGO_URI);
    } catch (err) {
      console.error('Mongoose connection error:', err);
    }
  };

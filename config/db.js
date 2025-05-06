import mongoose from "mongoose";

const connectDB = async () => {
  const connect = await mongoose.connect(process.env.MONGO_URI);
  if (connect) {
    console.log("Connected successfully");
  } else {
    console.log("mongo db cannot be connected");
  }
};

export default connectDB;

import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoute from "./route/userRoute.js";
dotenv.config();
const PORT = process.env.PORT;
const app = express();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRoute);
app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});

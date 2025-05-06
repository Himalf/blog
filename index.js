import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // ✅ Import CORS
import connectDB from "./config/db.js";
import userRoute from "./route/userRoute.js";
import blogRoute from "./route/blogRoute.js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
connectDB();

app.use(cors()); // ✅ Enable CORS for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});

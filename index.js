import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // ✅ Import CORS
import connectDB from "./config/db.js";
import userRoute from "./route/userRoute.js";
import blogRoute from "./route/blogRoute.js";
import courseCategory from "./route/categoryRoute.js";
import courseRoutes from "./route/courseRoute.js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoute);
app.use("/blog", blogRoute);
app.use("/category", courseCategory);
app.use("/mycourse", courseRoutes);

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});

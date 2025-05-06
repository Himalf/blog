import express from "express";
import multer from "multer";
import {
  createBlog,
  getAllBlogs,
  getUserBlogs,
  updateBlog,
  deleteBlog,
} from "../controller/blogController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/create", upload.single("image"), createBlog);
router.get("/", getAllBlogs);
router.get("/:user", getUserBlogs);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export default router;

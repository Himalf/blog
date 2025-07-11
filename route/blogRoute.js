import express from "express";
import multer from "multer";
import {
  createBlog,
  getAllBlogs,
  getUserBlogs,
  updateBlog,
  deleteBlog,
  getBlogById,
} from "../controller/blogController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/create", upload.single("image"), createBlog);
router.get("/single/:id", getBlogById);
router.get("/", getAllBlogs);
router.get("/:user", getUserBlogs);
router.patch("/:id", upload.single("image"), updateBlog);
router.delete("/:id", deleteBlog);

export default router;

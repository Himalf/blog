import express from "express";
import multer from "multer";
import {
  createCourse,
  getAllCourses,
  getCoursesByCategory,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controller/courseController.js";

const router = express.Router();

// Multer setup for image upload
const upload = multer({ dest: "uploads/" });

// Create course
router.post("/create", upload.single("image"), createCourse);

// Get all courses
router.get("/", getAllCourses);

// Get courses by category
router.get("/category/:categoryId", getCoursesByCategory);

// Get course by ID
router.get("/:id", getCourseById);

// Update course by ID
router.put("/:id", upload.single("image"), updateCourse);

// Delete course by ID
router.delete("/:id", deleteCourse);

export default router;

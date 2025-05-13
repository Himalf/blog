import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controller/categoryController.js";

const router = express.Router();

// Create category
router.post("/create", createCategory);

// Get all categories
router.get("/", getAllCategories);

// Get category by ID
router.get("/:id", getCategoryById);

// Update category by ID
router.put("/:id", updateCategory);

// Delete category by ID
router.delete("/:id", deleteCategory);

export default router;

import Course from "../model/Course.js";
import Category from "../model/Category.js";
import { uploadImageToSupabase } from "./uploadImage.js"; // Image upload utility
import fs from "fs";

// Create a new course
export const createCourse = async (req, res) => {
  try {
    const { title, description, instructor, category, duration, price } =
      req.body;

    // Validate if category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: "Category not found" });
    }

    // Handle image upload
    let imageUrl = null;
    if (req.file) {
      const filePath = req.file.path;
      imageUrl = await uploadImageToSupabase(filePath, req.file.originalname); // Upload to Supabase or other storage service
      fs.unlinkSync(filePath); // optional cleanup
    }

    const newCourse = new Course({
      title,
      description,
      instructor,
      category,
      duration,
      price,
      image: imageUrl, // Save image URL if available
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Course creation failed", details: err.message });
  }
};

// Update a course
export const updateCourse = async (req, res) => {
  try {
    const { title, description, instructor, category, duration, price } =
      req.body;

    // Validate if category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: "Category not found" });
    }

    // Prepare update data
    const updatedData = {
      title,
      description,
      instructor,
      category,
      duration,
      price,
    };

    // Handle image upload if available
    if (req.file) {
      const filePath = req.file.path;
      const imageUrl = await uploadImageToSupabase(
        filePath,
        req.file.originalname
      );
      fs.unlinkSync(filePath); // optional cleanup
      updatedData.image = imageUrl; // Update image URL
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(updatedCourse);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update course", details: err.message });
  }
};

// Delete a course
export const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to delete course", details: err.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "category",
      "title"
    );
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch course", details: err.message });
  }
};

export const getCoursesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const courses = await Course.find({ category: categoryId }).populate(
      "category",
      "title"
    );
    if (!courses) {
      return res
        .status(404)
        .json({ message: "No courses found for this category" });
    }
    res.json(courses);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch courses", details: err.message });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("category", "title");
    res.json(courses);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch courses", details: err.message });
  }
};

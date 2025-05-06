import Blog from "../model/Blog.js";
import { uploadImageToSupabase } from "./uploadImage.js";
import fs from "fs";

// Create a new blog
export const createBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const filePath = req.file.path;
    const imageUrl = await uploadImageToSupabase(
      filePath,
      req.file.originalname
    );

    fs.unlinkSync(filePath); // optional cleanup

    const newBlog = new Blog({ title, content, author, image: imageUrl });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Blog creation failed", details: err.message });
  }
};

// Get all blogs with populated author details
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "name email"); // Populating author field
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get blogs by a specific user (author)
export const getUserBlogs = async (req, res) => {
  try {
    const userId = req.params.user;
    const blogs = await Blog.find({ author: userId }).populate(
      "author",
      "name email"
    );
    res.status(200).json(blogs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch user's blogs", error: error.message });
  }
};

// Update a blog
export const updateBlog = async (req, res) => {
  try {
    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a blog
export const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId).populate("author", "name email");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch blog",
      error: error.message,
    });
  }
};

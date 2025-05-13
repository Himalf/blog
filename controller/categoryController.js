import Category from "../model/Category.js";

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { title, description, faculty } = req.body;

    const newCategory = new Category({ title, description, faculty });
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Category creation failed", details: err.message });
  }
};

// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch categories", details: err.message });
  }
};

// Get category by ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch category", details: err.message });
  }
};

// Update a category
export const updateCategory = async (req, res) => {
  try {
    const { title, description, faculty } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { title, description, faculty },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(updatedCategory);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update category", details: err.message });
  }
};

// Delete a category
export const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to delete category", details: err.message });
  }
};

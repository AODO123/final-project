const Product = require("../models/product");

// Handles database queries for product management
const getAllProducts = async () => {
  return Product.find().sort({ createdAt: -1 });
};

const getProductById = async (id) => {
  return Product.findById(id);
};

const createProduct = async (productData) => {
  return Product.create(productData);
};

// Return the updated document and enforce schema validation
const updateProduct = async (id, productData) => {
  return Product.findByIdAndUpdate(id, productData, {
    new: true,
    runValidators: true,
  });
};

const deleteProduct = async (id) => {
  return Product.findByIdAndDelete(id);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

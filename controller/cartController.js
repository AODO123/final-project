const cartService = require("../services/cartService");

// Local helper to create standardized HTTP errors
const createError = (message, status = 400) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

const validateQuantity = (quantity) => {
  const value = Number(quantity);
  return Number.isInteger(value) && value > 0;
};

const createCart = async (req, res, next) => {
  try {
    const cart = await cartService.createCart();
    return res.status(201).json(cart);
  } catch (error) {
    next(error);
  }
}; 

const getCart = async (req, res, next) => {
  try {
    const cart = await cartService.getCartById(req.params.id);
    return res.json(cart);
  } catch (error) {
    next(error);
  }
};

// Validates input before passing to cart service layer
const addItemToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId || !validateQuantity(quantity)) {
      throw createError("Product ID and quantity are required", 400);
    }

    const cart = await cartService.addItemToCart(
      req.params.id,
      productId,
      Number(quantity),
    );
    return res.status(201).json(cart);
  } catch (error) {
    next(error);
  }
};

const updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;

    if (!validateQuantity(quantity)) {
      throw createError("Quantity must be a positive number", 400);
    }

    const cart = await cartService.updateCartItem(
      req.params.id,
      req.params.productId,
      Number(quantity),
    );
    return res.json(cart);
  } catch (error) {
    next(error);
  }
};

const removeCartItem = async (req, res, next) => {
  try {
    const cart = await cartService.removeCartItem(
      req.params.id,
      req.params.productId,
    );
    return res.json(cart);
  } catch (error) {
    next(error);
  }
};

const clearCart = async (req, res, next) => {
  try {
    const cart = await cartService.clearCart(req.params.id);
    return res.json(cart);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCart,
  getCart,
  addItemToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};

const Product = require("../models/product");
const Cart = require("../models/cart");

// utilities for error handling and total calculation
const createError = (message, status = 400) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

const calculateTotal = async (items) => {
  let total = 0;
  for (const item of items) {
    const product = await Product.findById(item.product);
    if (product) {
      total += product.price * item.quantity;
    }
  }
  return total;
};

const createCart = async () => {
  return Cart.create({ items: [], totalAmount: 0 });
};

const getCartById = async (cartId) => {
  const cart = await Cart.findById(cartId).populate("items.product");
  if (!cart) {
    throw createError("Cart not found", 404);
  }
  return cart;
};

// Add or increment item quantity and recalculate cart total
const addItemToCart = async (cartId, productId, quantity) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw createError("Product not found", 404);
  }

  const cart = await Cart.findById(cartId);
  if (!cart) {
    throw createError("Cart not found", 404);
  }

  const existingItem = cart.items.find((item) =>
    item.product.equals(productId),
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  cart.totalAmount = await calculateTotal(cart.items);
  await cart.save();
  return cart.populate("items.product");
};

const updateCartItem = async (cartId, productId, quantity) => {
  const cart = await Cart.findById(cartId);
  if (!cart) {
    throw createError("Cart not found", 404);
  }

  const item = cart.items.find((entry) =>
    entry.product.equals(productId),
  );

  if (!item) {
    throw createError("Item not found in cart", 404);
  }

  item.quantity = quantity;
  cart.totalAmount = await calculateTotal(cart.items);
  await cart.save();
  return cart.populate("items.product");
};

const removeCartItem = async (cartId, productId) => {
  const cart = await Cart.findById(cartId);
  if (!cart) {
    throw createError("Cart not found", 404);
  }

  cart.items = cart.items.filter(
    (item) => !item.product.equals(productId),
  );
  cart.totalAmount = await calculateTotal(cart.items);
  await cart.save();
  return cart.populate("items.product");
};

const clearCart = async (cartId) => {
  const cart = await Cart.findById(cartId);
  if (!cart) {
    throw createError("Cart not found", 404);
  }

  cart.items = [];
  cart.totalAmount = 0;
  await cart.save();
  return cart;
};

module.exports = {
  createCart,
  getCartById,
  addItemToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};

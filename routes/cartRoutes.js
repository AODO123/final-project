const express = require("express");
const {
  createCart,
  getCart,
  addItemToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require("../controller/cartController");

const router = express.Router();

// routes that handle cart operations
router.post("/", createCart);
router.get("/:id", getCart);
router.post("/:id/items", addItemToCart);
router.put("/:id/items/:productId", updateCartItem);
router.delete("/:id/items/:productId", removeCartItem);
router.delete("/:id", clearCart);

module.exports = router;

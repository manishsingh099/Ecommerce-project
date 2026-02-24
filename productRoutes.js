const router = require("express").Router();
const {
  getProducts,
  addProduct
} = require("../controllers/productController");

// Get all products
router.get("/", getProducts);

// Add new product (Admin use)
router.post("/", addProduct);

module.exports = router;
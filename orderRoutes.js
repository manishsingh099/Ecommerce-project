const router = require("express").Router();
const {
  placeOrder,
  getUserOrders,
  getOrderDetails
} = require("../controllers/orderController");

// Place order
router.post("/", placeOrder);

// Get all orders of user
router.get("/:user_id", getUserOrders);

// Get order details
router.get("/details/:order_id", getOrderDetails);

module.exports = router;
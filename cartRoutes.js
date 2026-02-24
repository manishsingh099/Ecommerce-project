const router = require("express").Router();
const db = require("../config/db");
const { addToCart } = require("../controllers/cartController");

// Add to cart
router.post("/", addToCart);

// Get user cart
router.get("/:user_id", (req, res) => {
  const { user_id } = req.params;

  db.query(
    `SELECT cart.id, cart.quantity, products.name, products.price
     FROM cart
     JOIN products ON cart.product_id = products.id
     WHERE cart.user_id = ?`,
    [user_id],
    (err, data) => {
      if (err) return res.status(500).json(err);
      res.json(data);
    }
  );
});

// Remove cart item
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM cart WHERE id = ?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Item removed" });
    }
  );
});

module.exports = router;
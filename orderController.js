const db = require("../config/db");

// 🛒 PLACE ORDER
exports.placeOrder = (req, res) => {
  const { user_id } = req.body;

  // 1️⃣ Get Cart Items
  db.query(
    `SELECT cart.product_id, cart.quantity, products.price 
     FROM cart 
     JOIN products ON cart.product_id = products.id
     WHERE cart.user_id = ?`,
    [user_id],
    (err, cartItems) => {
      if (err) return res.status(500).json(err);

      if (cartItems.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }

      // 2️⃣ Calculate Total
      const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      // 3️⃣ Insert into orders table
      db.query(
        "INSERT INTO orders (user_id, total, status) VALUES (?, ?, ?)",
        [user_id, total, "Pending"],
        (err, orderResult) => {
          if (err) return res.status(500).json(err);

          const orderId = orderResult.insertId;

          // 4️⃣ Insert into order_items
          const orderItemsValues = cartItems.map(item => [
            orderId,
            item.product_id,
            item.quantity,
            item.price
          ]);

          db.query(
            "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?",
            [orderItemsValues],
            (err) => {
              if (err) return res.status(500).json(err);

              // 5️⃣ Clear Cart
              db.query(
                "DELETE FROM cart WHERE user_id = ?",
                [user_id],
                (err) => {
                  if (err) return res.status(500).json(err);

                  res.json({
                    message: "Order placed successfully",
                    orderId
                  });
                }
              );
            }
          );
        }
      );
    }
  );
};

// 📦 GET USER ORDERS
exports.getUserOrders = (req, res) => {
  const { user_id } = req.params;

  db.query(
    "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC",
    [user_id],
    (err, orders) => {
      if (err) return res.status(500).json(err);

      res.json(orders);
    }
  );
};

// 📄 GET ORDER DETAILS
exports.getOrderDetails = (req, res) => {
  const { order_id } = req.params;

  db.query(
    `SELECT oi.*, p.name 
     FROM order_items oi
     JOIN products p ON oi.product_id = p.id
     WHERE oi.order_id = ?`,
    [order_id],
    (err, items) => {
      if (err) return res.status(500).json(err);

      res.json(items);
    }
  );
};
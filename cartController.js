exports.addToCart = (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  db.query(
    "INSERT INTO cart (user_id,product_id,quantity) VALUES (?,?,?)",
    [user_id, product_id, quantity],
    (err) => {
      if (err) return res.json(err);
      res.json({ message: "Added to cart" });
    }
  );
};
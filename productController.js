const db = require("../config/db");

exports.getProducts = (req, res) => {
  db.query("SELECT * FROM products", (err, data) => {
    if (err) return res.json(err);
    res.json(data);
  });
};

exports.addProduct = (req, res) => {
  const { name, description, price, image, stock } = req.body;
  db.query(
    "INSERT INTO products (name,description,price,image,stock) VALUES (?,?,?,?,?)",
    [name, description, price, image, stock],
    (err) => {
      if (err) return res.json(err);
      res.json({ message: "Product Added" });
    }
  );
};
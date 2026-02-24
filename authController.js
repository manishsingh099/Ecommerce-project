const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
  const { name, email, password } = req.body;
  const hashed = bcrypt.hashSync(password, 10);

  db.query(
    "INSERT INTO users (name,email,password) VALUES (?,?,?)",
    [name, email, hashed],
    (err) => {
      if (err) return res.status(400).json(err);
      res.json({ message: "User Registered" });
    }
  );
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email=?", [email], (err, result) => {
    if (err || result.length === 0)
      return res.status(400).json({ message: "User not found" });

    const valid = bcrypt.compareSync(password, result[0].password);
    if (!valid) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign({ id: result[0].id }, "secret", {
      expiresIn: "1d"
    });

    res.json({ token });
  });
};
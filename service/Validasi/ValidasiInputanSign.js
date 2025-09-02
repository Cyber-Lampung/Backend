const database = require("../../model/Database");
const jwt = require("jsonwebtoken");
const hash = require("bcrypt");

function ValidasiSign(email, username, password, res) {
  const secretKey = "rahasiaSuperAman";

  const token = jwt.sign({ username: username }, secretKey, {
    algorithm: "HS256",
    expiresIn: "1h",
  });

  if (!id || !email || !username || !password) {
    return res.json({ active: false });
  } else {
    return res.json({ active: true, token: token });
  }
}

exports.module = ValidasiSign;

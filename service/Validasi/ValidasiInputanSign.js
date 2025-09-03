const database = require("../../model/Database");
const jwt = require("jsonwebtoken");
const hash = require("bcrypt");

function ValidasiSign(email, username, password, res) {
  const secretKey = "rahasiaSuperAman";

  const token = jwt.sign({ username: username }, secretKey, {
    algorithm: "HS256",
    expiresIn: "1h",
  });

  if (!email || !username || !password) {
    return res.json({ active: false });
  }

  try {
    database.module.query(
      "insert into user (email, username, password) values (?, ?, ?) ",
      [email, username, password],
      (err, result) => {
        if (err) {
          res.json({ valid: false });
        }

        res.json({ valid: true, token: token });
      }
    );
  } catch {
    console.log("invalid");
  }
}

exports.module = ValidasiSign;

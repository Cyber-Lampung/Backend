const jwt = require("jsonwebtoken");
const db = require("../../model/Database");
const bcrypt = require("bcrypt");

function ValidasiInputanLogin(email, password, res) {
  // // Set header CORS sekali di awal
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Methods", "GET,POST,DELETE");
  // res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (!email) {
    return res.json({
      userActive: false,
      Code: "Email harus diisi dengan benar",
    });
  }

  if (!password) {
    return res.json({
      userActive: false,
      Code: "Password harus diisi dengan benar",
    });
  }

  // check koneksi ketabase

  db.module.query(
    "select * from user where email = ?",
    [email],
    (err, result) => {
      if (err) {
        console.log(err);
      }

      const secretKey = "rahasiaSangat";

      const user = result[0];

      bcrypt.compare(password, user.password, (err, valid) => {
        if (err) {
          return res.json({ notValid: false });
        }

        console.log(valid);

        if (!valid) {
          return res.json({ valid: false });
        }

        const token = jwt.sign({ email: user.email }, secretKey, {
          algorithm: "HS256",
        });

        res.json({ valid: true, token: token });
      });
    }
  );
}

exports.module = ValidasiInputanLogin;

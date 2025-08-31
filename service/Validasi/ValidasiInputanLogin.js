const jwt = require("jsonwebtoken");
const db = require("../../model/Database");
const hash = require("bcrypt");

function ValidasiInputanLogin(email, password, res) {
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

  db.module.query("select * from user", (err, result) => {
    if (err) {
      console.log(err);
    }
    // membuat jsonwebtoken

    // secret key untuk generate token
    const secretKey = "rahasiaSangat";

    const token = jwt.sign({ email: email }, secretKey, { algorithm: "HS256" });

    // gunakana try catch supaya tidak crach jika database down atau data tidak ditemukan

    try {
      // Testing Debug
      // console.log(result);

      result.forEach((data) => {
        // check apakah email benar jika benar next check password

        if (data.email === email) {
          // check apakah password yang di database sama dengan yang di kirim user

          hash.compare(password, data.password, (err, result) => {
            if (result) {
              // jika result true maka kirim data username dan lainnya kedata user
              const username = data.username;

              // kirim data berikut untuk diberikan akses ke cookies
              res.json({
                valid: true,
                token: token,
                // ambil data email username dan password
                dataUser: { email, username, password },
              });
            } else {
              // berikan json valid = false jika data tidak ditemukan
              res.json({ valid: false });
            }
          });
        }
      });
    } catch {
      console.log("");
    }
  });
}

exports.module = ValidasiInputanLogin;

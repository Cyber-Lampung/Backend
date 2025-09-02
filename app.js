const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const hash = require("bcrypt");
const cookie = require("cookie-parser");
const database = require("./model/Database");
const ValidasiSign = require("./service/Validasi/ValidasiInputanSign");
const ValidasiInputanLogin = require("./service/Validasi/ValidasiInputanLogin");
const { verifyToken } = require("./middleware/verify/VerifyTokenHeader");

const app = express();
app.use(express.json());
app.use(cookie());

app.use(express.static(path.join(__dirname, "public")));

// izin kan hanya user yang diizinkn oleh
// croos origin recourse sharing yang boleh akses
app.use(
  cors({
    origin: "https://jasapembuatanwebsite-chi.vercel.app",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// get cookie data

app.get("/Cookie", (req, res) => {
  const validCookie = req.cookies;

  if (!validCookie) {
    console.log("not valid");
  }

  res.setHeader("authorization", "dia");
});

// route for documentation pages

app.get("/documentation", verifyToken, (req, res) => {
  fs.readFile(
    "./src/documentation/documentationApi.html",
    (err, documentation) => {
      if (err) {
        res.send(err);
      }

      res.end(documentation);
    }
  );
});

// root page

app.get("/", (req, res) => {
  fs.readFile("src/Pages/Login.html", (err, pages) => {
    if (err) {
      console.log(err);
    }

    res.end(pages);
  });
});

// user juga berikan akses verifytoken

app.get("/user", verifyToken, (req, res) => {
  // ambil data dari database jika header benar

  try {
    database.module.query("select * from user", (err, result) => {
      if (err) {
        console.log(err);
      }

      res.json(result);
    });
  } catch {
    console.log("Invalid get data");
  }
});

// route untuk Register pages
app.post("/Register", (req, res) => {
  const { id, email, username, password } = req.body;

  // function Validasi

  ValidasiSign.module(id, email, username, password, res);

  // const secretKey = "rahasiaSuperAman";

  // const token = jwt.sign({ username: username }, secretKey, {
  //   algorithm: "HS256",
  //   expiresIn: "1h",
  // });

  const saltRounds = 10;

  hash.hash(password, saltRounds, (err, Passhash) => {
    try {
      database.module.query(
        "insert into user (id, email, username, password) values (?, ?, ?, ?)",
        [id, email, username, Passhash],
        (user, err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    } catch {
      console.log("error");
    }
  });
});

// route for Login pages

app.post("/Login", (req, res) => {
  const { email, password } = req.body;

  ValidasiInputanLogin.module(email, password, res);
});

// route untuk delete user from database

app.delete("/delete", verifyToken, (req, res) => {
  // ambil data dari inputan user

  const { email } = req.body;
  console.log(email);

  try {
    // cari apakah email terdapat dalam database jika iya lanjut
    database.module.query(
      "delete from user where email = ?",
      [email],
      (err, GetEmail) => {
        // jika tidak ditemukan maka kirim error
        if (err) {
          console.log(err);
        }

        // jika ditemukan maka hapus user

        if (GetEmail.affectedRows > 0) {
          console.log("user berhasil dihapus");
        } else {
          console.log("user tidak ditemukan");
        }
      }
    );
  } catch {
    console.log("Failed Delete Data");
  }
});

// untuk dashboard diberikan akses keamanan supaya tidak dapat diakses ketika tidak memiliki header yang diizinkan
app.get("/dashboard", verifyToken, (req, res) => {
  res.send("hello ini dashboard");
});

app.get("/favico.ico", (req, res) => {
  fs.readFile("favico.ico", (err, ico) => {
    if (err) {
      res.end(err);
    }

    res.end(ico);
  });
});

// untuk menjalankan code ke listener network
app.listen(3000, () => {
  console.log("Succes Listen In port 3000");
});

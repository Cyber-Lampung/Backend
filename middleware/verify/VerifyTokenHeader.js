const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res
      .status(401)
      .json({ Invalid: true, pesan: "kamu tidak diizinkan !" });
  }

  // jika valid maka akan mengembalikan bolean
  const valid = token === "true";

  if (valid) {
    // jik valid maka akan next ke middleware selanjutnya
    next();
  }
};

module.exports = { verifyToken };

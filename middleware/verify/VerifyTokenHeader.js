const verifyToken = (req, res, next) => {
  // ambil isi header authorization
  const header = req.headers.authorization;

  // jika header authorization kosong maka set res ke 401 invalid true
  if (!header) {
    res.json({ Invalid: true, pesan: "kamu tidak diizinkan !" });
    res.status(401); // berikan kode akses 401 jika tidak ada value header
  }

  // izinkan untuk mengakses data dan dizinkan untuk akses api
  if (header === "dia") {
    // jika header memiliki header yang di izinkan maka callback next atau melanjutkan
    next();
    console.log("Succesfully");
  }
};

module.exports = { verifyToken };

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/Register", (req, res) => {
  const { email, username, password } = req.body;

  console.log(email);
});

app.listen(3000, () => {
  console.log("Succes Listen In port 3000");
});

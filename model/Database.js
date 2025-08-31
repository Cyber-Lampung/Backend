const express = require("express");
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12796398",
  password: "DM5raeWkhf",
  database: "sql12796398",
});

db.connect(function (err) {
  if (err) throw err;

  console.log("Berhasil Terkoneksi");
});

exports.module = db;

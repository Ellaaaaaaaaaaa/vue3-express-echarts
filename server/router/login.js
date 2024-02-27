var express = require("express");
var router = express.Router();
var data = require("../models/mongo.js");

//let data = require("../mock/login.json");
router.post("/validate", (req, res) => {
  if (
    data.findOne({ username: req.body.username, password: req.body.password })
  ) {
    res.send({ code: 1, msg: "success" });
  }
});

module.exports = router;

var express = require("express");
var router = express.Router();
var user = require("../models/mongo.js");

//let data = require("../mock/login.json");
router.post("/validate", (req, res) => {
  user
    .findOne({ username: req.body.username, password: req.body.password })
    .then((resu) => {
      console.log(resu);
      if (resu) {
        res.send({ code: 1, msg: "success" });
      } else {
        res.send({ code: 0, msg: "fail" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;

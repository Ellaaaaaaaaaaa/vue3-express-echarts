var express = require("express");
var router = express.Router();
var user = require("../models/mongo.js");

//let data = require("../mock/login.json");
router.post("/validate", (req, res) => {
  user
    .findOne({
      username: req.body.username,
      password: req.body.password,
    })
    .then((resu) => {
      console.log(resu);
      if (resu) {
        res.send({ code: 2, msg: "duplicate" });
      } else {
        user.create({
          username: req.body.username,
          password: req.body.password,
        });
        res.send({ code: 3, msg: "注册成功" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;

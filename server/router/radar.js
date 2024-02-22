var express = require("express");
var router = express.Router();
let data = require("../mock/screen2/radar.json");
router.get("/data", function (req, res) {
  res.send({ msg: "雷达图接口", data });
});
// 暴露路由
module.exports = router;

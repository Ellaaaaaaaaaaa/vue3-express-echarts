var express = require("express");
var router = express.Router();
let data = require("../mock/screen1/barChart.json");
router.get("/data", function (req, res) {
  res.send({ msg: "柱状图接口", data });
});
// 暴露路由
module.exports = router;

var express = require("express");
var router = express.Router();
let data = require("../mock/screen1/barChartRot.json");
router.get("/data", function (req, res) {
  res.send({ msg: "横向柱状图接口", data });
});
// 暴露路由
module.exports = router;

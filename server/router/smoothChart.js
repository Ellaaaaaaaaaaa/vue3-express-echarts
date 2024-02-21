var express = require("express");
var router = express.Router();
//引用数据
let data = require("../mock/screen1/smoothChart.json");
router.get("/data", function (req, res) {
  res.send({ msg: "曲线图接口", data });
});
// 暴露路由
module.exports = router;

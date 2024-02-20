var express = require("express");
var router = express.Router();
let data = require("../mock/textScroll.json");
router.get("/data", function (req, res) {
  res.send({ msg: "滚动列表接口", data });
});
// 暴露路由
module.exports = router;

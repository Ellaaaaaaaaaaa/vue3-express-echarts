var express = require("express");
var router = express.Router();
let data = require("../mock/textScrollDet.json");
router.get("/data", function (req, res) {
  res.send({ msg: "详细滚动列表接口", data });
});
// 暴露路由
module.exports = router;

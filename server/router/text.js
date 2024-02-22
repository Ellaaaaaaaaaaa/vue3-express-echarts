var express = require("express");
var router = express.Router();
let data = require("../mock/screen2/text.json");
router.get("/data", function (req, res) {
  res.send({ msg: "文字列表接口", data });
});
// 暴露路由
module.exports = router;

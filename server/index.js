var express = require("express");
var app = express();
// var url = "mongodb://127.0.0.1:27017/demo";
// var mongoose = require("mongoose");
// mongoose.connect(url, (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("mongodb connect success");
//   }
// });

//设置跨域
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length,Authorization, Accept, X-Requested-With , yourHeaderFeild"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET,DELETE,OPTIONS");
  // 千万不要网%%￥￥￥###
  // 千万不要网
  // 千万不要网
  next();
});
// 引用路由文件

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var smoothChart = require("./router/smoothChart.js");
var detailSmoChart = require("./router/detailSmoChart.js");
var pieChart = require("./router/pieChart.js");
var barChart = require("./router/barChart.js");
var barChartRot = require("./router/barChartRot.js");
var textScrollDet = require("./router/textScrollDet.js");
var text = require("./router/text.js");
var radar = require("./router/radar.js");
var login = require("./router/login.js");
// 中间件中使用路由
app.use("/smooth-chart", smoothChart);
app.use("/detail-smo-chart", detailSmoChart);
app.use("/pie-chart", pieChart);
app.use("/bar-chart", barChart);
app.use("/bar-chart-rot", barChartRot);
app.use("/text-scroll-det", textScrollDet);
app.use("/text", text);
app.use("/radar", radar);
app.use("/login", login);
// 请求是localhost:3000/user/路由文件中的地址
app.listen(3000);

const mongoose = require("mongoose");
// 通过useNewUrlParser: true解决当前URL解析器被废弃警告
mongoose.connect("mongodb://127.0.0.1:27017/demo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", (error) => {
  console.log("mongo error is :" + error);
});

db.on("open", () => {
  console.log("connection successed");
});

const loginSchema = new mongoose.Schema({
  _id: Number,
  username: String,
  password: String,
});
const user = mongoose.model("user", loginSchema);
module.exports = user;

const mongoose = require("mongoose");
// 通过useNewUrlParser: true解决当前URL解析器被废弃警告
mongoose.connect(
  "mongodb://admin:20031019@127.0.0.1:27017/demo?authSource=admin",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;

db.on("error", (error) => {
  console.log("mongo error is :" + error);
});

db.on("open", () => {
  console.log("connection successed");
});

const loginSchema = new mongoose.Schema({
  username: String,
  password: String,
});
//const data = require("../mock/login.json");
const user = mongoose.model("user", loginSchema);
//user.insertMany(data);
module.exports = user;

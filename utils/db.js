/* 数据库辅助工具，实现 mongodb 数据库连接 */
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/h51801");

module.exports = mongoose;

// 引入数据库连接模块
const mongoose = require("../utils/db");
// 引入加密模块(数据库的密码是要加密状态的);
const crypto = require("crypto");

// 用户 Schema
const userSchema = mongoose.Schema({
    username : String,
    password : String,
    email : String
});

// 创建集合
// 相当于在一个叫h51801的数据库里创建一张users的表
// 集合名会默认在 model() 方法第一个参数字符串后加 "s"
const User = mongoose.model("user", userSchema);

/* 数据的保存，查询功能 */
//保存用户数据 
function save(userInfo, success, error) {
    // 创建hash对象(这是一种加密的算法)
    const hash = crypto.createHash("sha256");
    // 对用户密码加密
    userInfo.password = hash.update(userInfo.password).digest("hex");
    // 保存用户数据到数据库
    new User(userInfo).save().then(success, error);
}

/* 查询用户数据 */ 
// 登录时去查数据库以前是否有注册过的用户
function find(conditions, success, error) {
    // 将用户密码加密
    const hash = crypto.createHash("sha256");
    conditions.password = hash.update(conditions.password).digest("hex");
    // 查询
    User.find(conditions).then(success, error);
}

// 根据用户名查询数据库中满足用户名条件的文档数(检测数据库中以前是否否该用户名存在)
function count(username, success, error) {
    User.find({username}).count().then(success, error);
}


module.exports = {save, find, count};

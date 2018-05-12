var express = require('express');
var router = express.Router();
const userController = require("../controllers/userController.js");

/* 总路由 */ 

// 检测用户是否存在路由
router.get("/check", userController.check);
// 注册路由
router.post("/register", userController.register);
// 登录路由
router.post("/login", userController.login);
// 用户是否登录路由
router.get("/isLogin", userController.isLogin);
// 用户退出路由
router.get("/logout", userController.logout);

module.exports = router;

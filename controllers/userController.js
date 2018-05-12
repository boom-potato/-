// 引入用户模型
const userModel = require("../models/userModel");


/* 用户注册 */
function register(req, res, next) {
    // 将请求主体中用户名，密码，邮箱解构到变量中
    const {username, password, email} = req.body;
    // 调用用户数据模型的方法来保存数据(在models文件夹中的userModel.js中。参数是userInfo,success,error该执行什么)                               
    userModel.save({username, password, email}, (data)=>{
        res.json({res_code:1, res_msg:"success", res_body:data});
    }, (err)=>{
        res.json({res_code:0, res_msg: err, res_body:{}});
    });
} 


/* 检测用户是否存在 */
function check(req, res, next) {
    // 获取get请求中传递的用户名参数(结构赋值)
    const {username} = req.query;
    // 调用模型方法count()来查询用户名记录条数
    userModel.count(username, (data)=>{
        if (data >= 1) // 已有注册用户
            res.json({res_code:1, res_msg:"exist"});
        else // 未注册指定用户名的用户信息
            res.json({res_code:0, res_msg:"not exist"});
    }, (err)=>{
        res.json({res_code:-1, res_msg:err});
    });
    
}

/*********************************************************************/

/* 用户登录 */
function login(req, res, next)  {
    // 将请求主体中传递用户的用户名和密码到结构变量中
    const {username, password} = req.body;
    // 查询用户信息(用到userModel.js中的find()方法)
    userModel.find({username, password}, (data)=>{
        if (data.length === 0) { // 用户名或密码错误
            res.json({res_code:0, res_msg: "failed"});
        } else { // 登录成功
            req.session.isLogin = true; // 标记用户登录成功(就要去配置app.js里面的session)
            req.session.username = data[0].username; // 记录登录成功的用户名
            res.json({res_code:1, res_msg: "success"});
        }
    }, (err)=>{
        res.json({res_code:-1, res_msg: err});
    });
}


/* 获取用户是否登录成功 */
function isLogin(req, res, next) {
    if (req.session.isLogin) {
       res.json({res_code:1, res_msg:"success", res_body : {username : req.session.username, age : 15}}); 
    } else {
        res.json({res_code:0, res_msg:"failed"});
    }
} 

/* 用户退出 */
function logout(req, res, next) {
    req.session = null;
    res.json({res_code:1, res_msg:"success"});
} 


module.exports = {register, check, login, isLogin, logout};

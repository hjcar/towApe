const express = require("express");
const user = require("../api/user");
const mytoken = require("../api/mytoken");
const emailapi = require("../api/email");
let router = express.Router();
router.get("/", async function(req, res, next) {
  //发送消息获取有多少个进程
  process.send({ msg: "notifyRequest" });
  res.send("你好");
});

router.post("/api/login/", function(req, res, next) {
  user.checkingUser(req.body).then(function(data) {
    res.json(data);
    console.log(mytoken.tokenidDecrypt(data.token));
  });
});

router.post("/api/register/", function(req, res, next) {
  user.createUser(req.body).then(function(data) {
    console.log(data);
    res.json(data);
    // console.log(mytoken.tokenidDecrypt(data.token));
  });
});
router.post("/api/forgetpwd/", function(req, res, next) {
  user.forgetPwdUser(req.body).then(function(data) {
    console.log(data);
    res.json(data);
    // console.log(mytoken.tokenidDecrypt(data.token));
  });
});

router.post("/api/emailapi/", function(req, res, next) {
  emailapi.setEmailData("1656082188@qq.com").then(function(data) {
    console.log(data);
    res.json(data);
  });
  res.send("你好");
});

//路由拦截 token 是否登录
router.use(function(req, res, next) {
  //验证token是否过期 以及是否存在

  if (mytoken.tokenidDecrypt(req.headers.token)) {
    next();
  } else {
    res.json({
      code: "403",
      msg: "请登录"
    });
  }
});

//登录了重置密码
router.post("/api/resetpwd/", function(req, res, next) {
  //获取到token解密
  var userid = mytoken.tokenidDecrypt(req.headers.token).user_id;

  req.body.userid = userid;
  user.resetpwdUser(req.body).then(function(data) {
    console.log(data);
    res.json(data);
    // console.log(mytoken.tokenidDecrypt(data.token));
  });
});

router.use(function(err, req, res, next) {
  console.log(err);
  res.status(500);
  res.send("没有页面");
});

module.exports = router;

//综合验证
const login = require("./login"); //登录模块
const resgister = require("./register"); //注册模块
const fn = require("../commonfn"); //公共函数模块
const mytoken = require("../mytoken"); //token
const forgetpwd = require("./forgetpwd"); //忘记密码模块
const resetpwd = require("./resetpwd"); //重置密码模块
const crypto = require("../crypto"); //加密解密
//登录验证
async function checkingUser(object) {
  const user = object.user;
  const password = object.password;
  //没有空格验证成功
  if (fn.isTrim(user) || fn.isTrim(password)) {
    return {
      code: 2,
      msg: "有空值"
    };
  } else {
    const res = await login.getuser(user, password);
    if (res) {
      console.log();
      return {
        code: 0,
        token: mytoken.tokenEncryption(res),
        msg: "登录成功"
      };
    } else {
      return {
        code: 1,
        msg: "账号或密码错误"
      };
    }
  }
}
var fields = ["phone", "email"];
//注册验证
async function createUser(object) {
  const field = object.field; //查询的类型 qq号 微信号 手机号 邮箱
  const author = object.author; //用户名
  const password = object.password; //密码
  const rpassword = object.rpassword; //重复密码
  const bool = fields.find(item => {
    return field == item;
  });
  if (!bool) {
    //判断字断
    return {
      code: 2,
      msg: "错误字段"
    };
  }
  if (fn.isTrim(field) || fn.isTrim(password) || fn.isTrim(author)) {
    return {
      code: 2,
      msg: "有空值"
    };
  }
  if (password !== rpassword) {
    return {
      code: 2,
      msg: "两次密码不一致"
    };
  }
  //验证账号是否注册
  if ((await resgister.selectUser(field, author)) > 0) {
    return {
      code: 1,
      msg: "账号已经存在"
    };
  }
  //可以注册账号了
  //注册成功
  if ((await resgister.insertPhoneUser(field, author, password)) > 0) {
    return {
      code: 0,
      msg: "注册成功"
    };
  } else {
    return {
      code: 1,
      msg: "注册失败"
    };
  }
}
//忘记密码
async function forgetPwdUser(object) {
  const email = object.email; //用户名
  const password = object.password; //密码
  const rpassword = object.rpassword;
  if (password !== rpassword) {
    return {
      code: 2,
      msg: "两次密码不一致"
    };
  }

  const pwd = await forgetpwd.selectpwder(email);
  if (!pwd) {
    return {
      code: 1,
      msg: "没有该用户"
    };
  }
  if (crypto.my_encrypt(password) == pwd.password) {
    return {
      code: 1,
      msg: "重置密码不能一样"
    };
  }
  if ((await forgetpwd.forgetpwder(email, password)) > 0) {
    return {
      code: 0,
      msg: "修改成功"
    };
  } else {
    return {
      code: 404,
      msg: "修改失败"
    };
  }
}
//登录了重置密码
async function resetpwdUser(object) {
  const userid = object.userid; //用户id
  const password = object.password; //密码
  const rpassword = object.rpassword;
  if (password !== rpassword) {
    return {
      code: 2,
      msg: "两次密码不一致"
    };
  }
  const pwd = await resetpwd.selectpwder(userid);
  if (!pwd) {
    return {
      code: 1,
      msg: "没有该用户"
    };
  }
  if (crypto.my_encrypt(password) == pwd.password) {
    return {
      code: 1,
      msg: "重置密码不能一样"
    };
  }
  if ((await resetpwd.resetpwder(userid, password)) > 0) {
    return {
      code: 0,
      msg: "修改成功"
    };
  } else {
    return {
      code: 404,
      msg: "修改失败"
    };
  }
}

module.exports = {
  checkingUser,
  createUser,
  forgetPwdUser,
  resetpwdUser
};

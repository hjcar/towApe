const nodemailer = require("nodemailer");
const fs = require("fs");
const db = require("../../db");
const fn = require("../commonfn");
const config = require("./config");
//发送邮箱
async function setEmailData(email) {
  if (!fn.checkEmail(email)) {
    return {
      code: 500,
      msg: "邮箱格式不对"
    };
  }

  let yzm = fn.roundYzm(); //验证码
  let text = await fs.readFileSync(config.emailTemplateDir, "utf8"); //获取模板
  //获得发送验证码的模板
  text = text.replace("#yzm#", yzm);
  const expdate = fn.format(fn.getTime() + config.expdate); //过期时间
  const flag = await optionEmail({ yzm, text, email, expdate });
  if (flag >= 1) {
    return {
      code: "0",
      msg: "发送成功"
    };
  } else {
    return {
      code: "500",
      msg: "发送失败"
    };
  }
}
function optionEmail(object) {
  return new Promise(function(resolve, reject) {
    const email = object.email;
    const expdate = object.expdate;
    const code = object.yzm;
    const text = object.text;

    // 使用网易发送邮件
    // 更多请查看支持列表：https://nodemailer.com/smtp/well-known/
    let transporter = nodemailer.createTransport(config.createTransport);

    let mailOptions = {
      from: config.mailOptions.from, // 你到qq邮箱地址
      to: email, // 接受人,可以群发填写多个逗号分隔
      subject: config.mailOptions.subject,
      html: text
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        reject(0);
        return;
      } else {
        db.query(
          "insert  into email_table (email,code,exp_date) VALUES(?,?,?)  ",
          [email, code, expdate],
          function(err, row) {
            if (err) {
              reject(err);
              return;
            }
            //发送成功返回
            resolve(row.affectedRows);
          }
        );
      }
    });
  });
}

//验证邮箱
async function checkEmail(email) {
  if (!fn.checkEmail(email)) {
    return false;
  }

  const res = await selectEmail(email);
  if (fn.getTime(res.expdate) - fn.getTime() <= 0) {
    return false; //时间过期验证失败
  } else {
    //验证成功
    return true;
  }
}

function selectEmail(email) {
  return new Promise((resolve, reject) => {
    db.query(
      "select code,exp_date as expdate from email_table where email= ? ORDER BY exp_date DESC limit 1",
      [email],
      function(err, rows) {
        if (err) {
          console.log(err);
          reject(err);
          return;
        }
        resolve(rows[0]);
      }
    );
  });
}

module.exports = {
  setEmailData,
  checkEmail
};

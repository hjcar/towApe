var path = require("path");

module.exports = {
  emailTemplateDir: path.join(
    process.cwd(),
    "/public/static/emailTemplate.txt"
  ),
  createTransport: {
    //配置邮箱
    port: 465, // SMTP 端口
    host: "smtp.163.com",
    secureConnection: true, // 使用了 SSL
    auth: {
      user: "twoape@163.com",
      // 这里密码不是qq密码，是你设置的smtp授权码
      pass: "Huojin123"
    }
  },
  mailOptions: {
    from: '"二次猿"twoape@163.com', //你的邮箱
    subject: "二次猿验证注册" // 主题名(邮件名)
  },
  expdate: 1000 * 60 * 30 //过期时间
};

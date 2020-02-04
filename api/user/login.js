const db = require("../../db/index");
const crypto = require("../crypto"); //加密解密
//获取用户的账号密码
function getuser(user, password) {
  return new Promise((resolve, reject) => {
    db.query(
      "select user_id from user where email= ? and password=?   limit 1",
      [user, crypto.my_encrypt(password)],
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
  getuser
};

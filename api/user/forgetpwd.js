//重置密码
const db = require("../../db/index");
const crypto = require("../crypto"); //加密解密

//通过用户名查询用户的密码
function selectpwder(email) {
  return new Promise((resolve, reject) => {
    db.query(
      "select password from user where email= ?  limit 1",
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

function forgetpwder(email, password) {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE user SET password= ? WHERE email =? LIMIT 1 ",
      [crypto.my_encrypt(password), email],
      function(err, rows) {
        if (err) {
          console.log(err);
          reject(err);
          return;
        }
        resolve(rows.affectedRows);
      }
    );
  });
}

module.exports = {
  selectpwder,
  forgetpwder
};

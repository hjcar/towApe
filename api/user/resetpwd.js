//重置密码
const db = require("../../db/index");
const crypto = require("../crypto"); //加密解密

function selectpwder(userid) {
  return new Promise((resolve, reject) => {
    db.query(
      "select password from user where user_id= ?  limit 1",
      [userid],
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

function resetpwder(userid, password) {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE user SET password= ? WHERE user_id =? LIMIT 1 ",
      [crypto.my_encrypt(password), userid],
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
  resetpwder
};

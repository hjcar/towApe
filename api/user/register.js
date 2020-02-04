const db = require("../../db/index");
const crypto = require("../crypto"); //加密解密
//添加用户
function insertPhoneUser(field, author, password) {
  return new Promise((resolve, reject) => {
    db.query(
      `insert into user (${field},PASSWORD) VALUES(?,?)`,
      [author, crypto.my_encrypt(password)],
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

//查询用户
function selectUser(field, author) {
  return new Promise((resolve, reject) => {
    try {
      db.query(
        `select ${field} from user where ${field} = ? limit 1  `,
        [author],
        function(err, rows) {
          if (err) {
            reject(err);
            return;
          }
          resolve(rows.length);
        }
      );
    } catch (err) {
      reject(err);
    }
  });
}
module.exports = {
  insertPhoneUser,
  selectUser
};

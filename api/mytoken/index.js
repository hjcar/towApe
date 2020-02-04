const jwt = require("jsonwebtoken");
//token加密
function tokenEncryption(userid) {
  return jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60, //一小时过期
      data: JSON.stringify(userid)
    },
    "twoApeABCDEFG"
  );
}

//解密
function tokenidDecrypt(tokenstr) {
  try {
    const res = jwt.verify(tokenstr, "twoApeABCDEFG");
    return JSON.parse(res.data);
  } catch (err) {
    //报错说明过期了
    return false;
  }
}
module.exports = {
  tokenEncryption,
  tokenidDecrypt
};

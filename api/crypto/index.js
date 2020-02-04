// 加密模块
const crypto = require("crypto");
const CryptoJS = require("crypto-js");
//crypto加密解密
function cipher(str) {
  try {
    const cipher = crypto.createCipher("aes-128-cbc", "towApe");
    let encrypted = cipher.update(str, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
  } catch (e) {
    console.log("加密失败");
    return e.message;
  }
}
function decrypt(encrypted) {
  try {
    const decipher = crypto.createDecipher("aes-128-cbc", "towApe");
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (e) {
    console.log("解密失败");
    return e.message;
  }
}

//CryptoJS 加密解密
const key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF"); //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse("ABCDEF1234123412"); //十六位十六进制数作为密钥偏移量
//加密方法
function Encrypt(word) {
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.ciphertext.toString().toUpperCase();
}

//解密方法
function Decrypt(word) {
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

//单项加密解密

//md5加密
function my_md5(clearText) {
  let md5 = crypto.createHash("md5");
  let pwd = md5.update(clearText).digest("hex");
  return pwd;
}
function my_sha1(clearText) {
  let sha1 = crypto.createHash("sha1");
  let pwd = sha1.update(clearText).digest("hex");
  return pwd;
}

//双重加密
function my_encrypt(clearText) {
  let pwd = my_md5(clearText);
  return my_sha1(pwd);
}

module.exports = {
  cipher,
  decrypt,
  Decrypt,
  Encrypt,
  my_md5,
  my_sha1,
  my_encrypt
};

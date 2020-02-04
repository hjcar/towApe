function strTirm(str) {
  str = str.replace(/\s*/g, "");
  return str;
}

function isTrim(str) {
  const reg = /\s/;
  return reg.test(str);
}

function roundYzm(number = 6) {
  const yzm = Math.round(Math.random() * Math.pow(10, number));
  return yzm;
}
//验证邮箱格式
function checkEmail(str) {
  var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
  console.log(re.test(str));
  if (re.test(str)) {
    return true;
  } else {
    return false;
  }
}

//获取当前时间

function getTime(tiem) {
  if (tiem) {
    var date = new Date(tiem);
    return date.getTime();
  } else {
    var date = new Date();
    return date.getTime();
  }
}
function format(time) {
  var date = new Date(time);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  var d = date.getDate();
  var h = date.getHours();
  var mm = date.getMinutes();
  var s = date.getSeconds();
  return y + "-" + m + "-" + d + " " + h + ":" + mm + ":" + s;
}

module.exports = {
  strTirm,
  isTrim,
  roundYzm,
  checkEmail,
  getTime,
  format
};

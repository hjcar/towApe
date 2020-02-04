function strTirm(str) {
  str = str.replace(/\s*/g, "");
  return str;
}
function isTrim(str) {
  var reg = /\s/;
  return reg.test(str);
}

module.exports = { strTirm, isTrim };

var mysql = require("mysql");
var config = require("./config");
var pool = mysql.createPool(config); //数据库连接配置

function query(sql, Option, callback) {
  pool.getConnection(function(err, connection) {
    connection.query(sql, Option, function(err, rows) {
      callback(err, rows);
      connection.release();
    });
  });
} //对数据库进行增删改查操作的基础

exports.query = query;

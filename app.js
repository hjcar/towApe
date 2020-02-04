var cluster = require("cluster");
const express = require("express");
const router = require("./router");
const bodyParser = require("body-parser");

if (cluster.isMaster) {
  var numCPUs = require("os").cpus().length; //8核cpu
  var data = 0;
  // 启动多个进程.
  for (var i = 0; i < numCPUs; i++) {
    //增加一个进程
    var worker_process = cluster.fork();
    //侦听子进程的message事件
    worker_process.on("message", function(msg) {
      if (msg.cmd && msg.cmd == "notifyRequest") {
        data++;
        console.log("data的值 ", data);
      }
    });
  }
} else {
  const app = express();
  app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
  app.use(router);

  //服务器开启
  app.listen(3000, () => {
    console.log(`工作进程${process.pid} is runing`);
  });
}

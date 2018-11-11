"use strict";

var cluster = require("cluster");
var http = require("http");

if (!cluster.isWorker) {
  return;
}

console.log("[worker] " + "start worker ..." + cluster.worker.id);

process.on("message", function(msg) {
  console.log("[worker] " + msg);
  // process.send("[worker] worker" + cluster.worker.id + " received!");
});

if (cluster.worker.id === 6) {
  // 发送给agent的信息
  process.send({
    from: 'worker' + cluster.worker.id,
    to: 'agent',
    action: 'worker2agent',
    data: {
      'workerId': cluster.worker.id,
      'msg': 'hello agent'
    }
  });
}

http.createServer(function(req, res) {
  console.log('res worker ' + cluster.worker.id);
  res.writeHead(200, {"content-type": "text/html"});
  res.end("worker" + cluster.worker.id + ",PID:" + process.pid);
}).listen(9999);

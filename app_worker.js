"use strict";

var cluster = require("cluster");
var http = require("http");

if (!cluster.isWorker) {
  return;
}

console.log("[worker] " + "start worker ..." + cluster.worker.id);

process.on("message", function(msg) {
  console.log("[worker] " + msg);
  process.send("[worker] worker" + cluster.worker.id + " received!");
});

http.createServer(function(req, res) {
  console.log('res worker ' + cluster.worker.id);
  res.writeHead(200, {"content-type": "text/html"});
  res.end("worker" + cluster.worker.id + ",PID:" + process.pid);
}).listen(9999);

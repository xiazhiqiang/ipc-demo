"use strict";

var cluster = require("cluster");
var http = require("http");
var numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork();
    worker.send("hi there");
    worker.on("message", msg => {
      console.log(`msg: ${msg} from worker#${worker.id}`);
    });
  }

  cluster.on("listening", function(worker, address) {
    console.log("listening: worker " + worker.process.pid + ", Address: " + address.address + ":" + address.port);
  });

  cluster.on("exit", function(worker, code, signal) {
    console.log("worker " + worker.process.pid + " died");
  });

} else if (cluster.isWorker) {
  process.on("message", (msg) => {
    process.send(msg);
  });
  http.createServer(function(req, res) {
    res.writeHead(200);
    res.end("hello world\n");
  }).listen(9999);
}


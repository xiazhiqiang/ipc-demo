"use strict";

/*
*
*             ┌────────┐
*             │ parent │
*            /└────────┘\
*           /     |      \
*          /  ┌────────┐  \
*         /   │ master │   \
*        /    └────────┘    \
*       /     /         \    \
*     ┌───────┐         ┌───────┐
*     │ agent │ ------- │  app  │
*     └───────┘         └───────┘
*
* 创建
* master -> child_process.fork
* master -> cluster.fork(cfork)
*
* message通信
*
* app_worker -> master
* agent_worker -> master
*/

var path = require("path");
var cluster = require("cluster");
var cfork = require("cfork");
var childProcess = require("child_process");

// worker进程
var app_worker = path.join(__dirname, "app_worker.js");
var agent_worker = path.join(__dirname, "agent_worker.js");

// CPU个数
var cpuNum = require("os").cpus().length;

console.log("[master] " + "start master...");

// agent_agent进程
var agentWorker = childProcess.fork(agent_worker);

// master向agent发送消息
agentWorker.send("hello agent" + agentWorker.pid);

// master监听agent发过来的消息
agentWorker.on("message", function(msg) {
  console.log("message from agent: " + msg);
});

agentWorker.on("error", function(err) {
  console.error(err);
});


// app_worker进程
cfork({
  exec: app_worker,
  count: cpuNum
});

cluster.on("fork", function(worker) {
  console.log("[midway:cluster] new web-worker#%s:%s start, state: %s, current workers: %j",
    worker.id, worker.process.pid, worker.state, Object.keys(cluster.workers));

  // master监听worker发送过来的消息
  worker.on("message", function(msg) {
    console.log("message from worker: " + msg);
  });

  // master向worker发送消息
  worker.send("hello worker" + worker.id);
});

cluster.on("disconnect", (worker) => {
  console.log("[midway:cluster] web-worker#%s:%s disconnect, suicide: %s, state: %s, current workers: %j",
    worker.id, worker.process.pid, worker.suicide, worker.state, Object.keys(cluster.workers));
});

cluster.on("exit", function(worker, code, signal) {
  console.error("[%s] [master:%s] wroker exit: %s", Date(), process.pid, "code:" + code + " signal:" + signal);
});

cluster.on("error", function(err) {
  console.error(err);
});

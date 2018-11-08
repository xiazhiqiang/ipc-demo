"use strict";

console.log("[agent] " + "start agent ..." + process.pid);

process.on("message", function(msg) {
  console.log("[agent] " + msg);
  process.send("[agent] agent" + process.pid + " received!");
});

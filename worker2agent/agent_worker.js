"use strict";

console.log("[agent] " + "start agent ..." + process.pid);

process.on("message", function(msg) {
  if (msg && msg.action === 'worker2agent') {
    console.log(msg.data.msg);

    // 发送给worker的信息
    var workerId = msg.data.workerId || '';
    process.send({
      from: 'agent' + process.pid,
      to: 'worker' + workerId,
      action: 'agent2worker',
      data: {
        'workerId': workerId,
        'msg': 'hello worker' + workerId
      }
    });
    return;
  }

  console.log("[agent] " + msg);
  // process.send("[agent] agent" + process.pid + " received!");
});

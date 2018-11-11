# ipc-demo

通过 cluster 和 cfork 进行 nodejs 多进程之间的消息通信示例，了解 IPC 通信的机制。
其中学习借鉴了 [eggjs/egg-cluster](https://github.com/eggjs/egg-cluster/) 的实现，
详见[多进程模型和 IPC 进程通信](https://eggjs.org/zh-cn/core/cluster-and-ipc.html)

```
                  +--------+          +-------+
                  | Master |<-------->| Agent |
                  +--------+          +-------+
                  ^   ^    ^
                 /    |     \
               /      |       \
             /        |         \
           v          v          v
  +----------+   +----------+   +----------+
  | Worker 1 |   | Worker 2 |   | Worker 3 |  ...
  +----------+   +----------+   +----------+

```

## 目录说明

- official：nodejs 官方多进程通信 demo
- normal：模拟 app_worker <-> master 通信，agent_worker <-> master 通信
- worker2agent：模拟 app_worker <-> agent_worker 通信

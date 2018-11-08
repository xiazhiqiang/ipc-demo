# ipc-demo

通过 cluster 和 cfork 进行 nodejs 多进程之间的消息通信示例，了解 IPC 通信的机制。
其中学习借鉴了 eggjs 及 eggjs/egg-cluster 的实现。

```
             ┌────────┐
             │ parent │
            /└────────┘\
           /     |      \
          /  ┌────────┐  \
         /   │ master │   \
        /    └────────┘    \
       /     /         \    \
     ┌───────┐         ┌───────┐
     │ agent │ ------- │  app  │
     └───────┘         └───────┘
```

## 目录说明

- official：nodejs 官方多进程通信 demo
- normal：模拟 app_worker <-> master 通信，agent_worker <-> master 通信
- worker2agent：模拟 app_worker <-> agent_worker 通信
- messager：通过一个 messager 中心，对 master、agent、app 之间进行通信

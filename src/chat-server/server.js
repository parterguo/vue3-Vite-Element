/*
 * @Descripttion: 
 * @version: 
 * @Author: YaBing
 * @Date: 2025-08-13 12:13:13
 * @LastEditTime: 2025-08-15 13:59:07
 */
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });
console.log("WebSocket服务器已启动，端口8080");

const clients = {}; // 存储连接: userId => { ws, lastActive }
const HEARTBEAT_INTERVAL = 30000; // 30秒心跳间隔
const HEARTBEAT_TIMEOUT = 60000; // 60秒无响应则断开连接

// 心跳检测定时器
const heartbeatCheck = setInterval(() => {
  const now = Date.now();
  for (const userId in clients) {
    const client = clients[userId];
    if (now - client.lastActive > HEARTBEAT_TIMEOUT) {
      console.log(`${userId} 心跳超时，断开连接`);
      client.ws.terminate(); // 强制断开连接
      delete clients[userId];
    } else if (client.ws.readyState === WebSocket.OPEN) {
      // 发送心跳ping
      client.ws.ping();
    }
  }
}, HEARTBEAT_INTERVAL);

wss.on("connection", (ws) => {
  // 初始化最后活跃时间
  let userId = null;
  
  // 心跳响应
  ws.on('pong', () => {
    if (userId && clients[userId]) {
      clients[userId].lastActive = Date.now();
    }
  });
  
  ws.on('error', (error) => {
    console.error(`连接错误: ${error}`);
    if (userId) {
      delete clients[userId];
    }
  });

  ws.on("message", (message) => {
    try {
      const msg = JSON.parse(message);

      if (msg.type === "init") {
        // 保存客户端连接
        userId = msg.from;
        clients[userId] = {
          ws: ws,
          lastActive: Date.now()
        };
        console.log(`${userId} 已连接`);
      } else if (msg.type === "chat") {
        // 更新活跃时间
        if (userId && clients[userId]) {
          clients[userId].lastActive = Date.now();
        }
        
        // 转发给目标客户端
        const target = clients[msg.to]?.ws;
        if (target && target.readyState === WebSocket.OPEN) {
          target.send(JSON.stringify(msg));
        }
        // 给自己回显
        if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(msg));
      } else if (msg.type === "heartbeat") {
        // 显式心跳响应
        if (userId && clients[userId]) {
          clients[userId].lastActive = Date.now();
          ws.send(JSON.stringify({ type: "heartbeat", status: "alive" }));
        }
      }
    } catch (e) {
      console.error("消息解析错误:", e);
    }
  });

  ws.on("close", () => {
    if (userId) {
      console.log(`${userId} 已断开`);
      delete clients[userId];
    }
  });
});

// 服务器关闭时清理定时器
wss.on("close", () => {
  clearInterval(heartbeatCheck);
});
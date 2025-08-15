<template>
  <div class="chat-container">
    <h2>客户端聊天</h2>
    <div class="chat-box" ref="chatBox">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        :class="msg.from === 'user1' ? 'msg user' : 'msg admin'"
      >
        <el-avatar :src="msg.avatar" size="40" class="avatar"></el-avatar>
        <div class="msg-content">
          <div class="name">{{ msg.name }}</div>
          <div class="content">{{ msg.content }}</div>
          <div class="time">{{ formatTime(msg.timestamp) }}</div>
        </div>
      </div>
    </div>
    <div class="input-area">
      <input
        v-model="input"
        @keyup.enter="sendMessage"
        placeholder="请输入消息..."
      />
      <button @click="sendMessage">发送</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from "vue";
import { ElAvatar } from "element-plus";
import axios from "axios"; // 引入 axios

export default {
  components: { ElAvatar },
  setup() {
    const messages = ref([]);
    const input = ref("");
    const chatBox = ref(null);
    let ws;

    const API_URL = "http://localhost:3000/api/data";
    const CHAT_HISTORY_KEY = "chat_history_user_admin";

    const userName = "用户A";
    const userAvatar =
      "https://img2.baidu.com/it/u=372601434,3534902205&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500";
    const adminAvatar =
      "https://img1.baidu.com/it/u=570016865,823055038&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500";

    const scrollToBottom = () => {
      nextTick(() => {
        chatBox.value.scrollTop = chatBox.value.scrollHeight;
      });
    };

    // 保存聊天记录
    const saveHistory = async () => {
      try {
        await axios.post(API_URL, {
          key: CHAT_HISTORY_KEY,
          value: messages.value,
        });
      } catch (error) {
        console.error("保存聊天记录失败:", error);
      }
    };

    // 获取聊天记录
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`${API_URL}/${CHAT_HISTORY_KEY}`);
        if (response.data && response.data.value) {
          messages.value = response.data.value;
          scrollToBottom();
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log("暂无历史记录");
        } else {
          console.error("获取聊天记录失败:", error);
        }
      }
    };

    onMounted(() => {
      // 先加载历史记录
      fetchHistory();

      ws = new WebSocket("ws://localhost:8080");
      ws.onopen = () =>
        ws.send(JSON.stringify({ type: "init", from: "user1" }));
      ws.onmessage = (e) => {
        const msg = JSON.parse(e.data);
        // 排除自己的消息回显
        if (msg.from === "kf1") {
          msg.name = "客服小李";
          msg.avatar = adminAvatar;
          messages.value.push(msg);
          saveHistory(); // 保存客服发来的消息
          scrollToBottom();
        }
      };
    });

    const sendMessage = () => {
      if (!input.value) return;
      // 构建消息对象
      const msg = {
        from: "user1",
        content: input.value,
        timestamp: Date.now(),
        name: userName,
        avatar: userAvatar,
      };
      // 先添加到本地显示
      messages.value.push(msg);
      // 发送到服务器
      ws.send(
        JSON.stringify({
          type: "chat",
          from: "user1",
          to: "kf1",
          content: input.value,
        })
      );
      // 保存历史记录
      saveHistory();
      input.value = "";
      scrollToBottom();
    };

    const formatTime = (ts) => new Date(ts).toLocaleTimeString();

    return { messages, input, sendMessage, chatBox, formatTime };
  },
};
</script>

<style scoped>
.chat-container {
  width: 800px;
  margin: 0 auto;
  border: none;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  padding: 24px;
  border-radius: 16px;
  background: #fff;
}

.chat-box {
  height: 600px;
  overflow-y: auto;
  border: none;
  padding: 20px;
  margin-bottom: 20px;
  background: #f8fafc;
  border-radius: 12px;
  scrollbar-width: thin;
}

/* 滚动条样式优化 */
.chat-box::-webkit-scrollbar {
  width: 4px;
}

.chat-box::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}

/* 消息气泡通用样式 */
.msg {
  display: flex;
  align-items: flex-start;
  margin-bottom: 24px;
  max-width: 85%;
  animation: fadeIn 0.3s ease;
  position: relative;
}

/* 用户消息靠右显示 */
.msg.user {
  margin-left: auto;
  flex-direction: row-reverse;
}

/* 管理员消息靠左显示 */
.msg.admin {
  margin-right: auto;
  flex-direction: row;
}

/* 头像样式优化 */
.avatar {
  margin: 0 12px;
  border: 2px solid #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s;
}

.avatar:hover {
  transform: scale(1.05);
}

/* 消息内容容器 */
.msg-content {
  display: flex;
  flex-direction: column;
  max-width: 500px;
}

/* 发送者名称 */
.name {
  font-size: 13px;
  color: #64748b;
  margin-bottom: 4px;
  font-weight: 500;
}

/* 消息内容气泡 */
.content {
  padding: 12px 18px;
  border-radius: 18px;
  position: relative;
  line-height: 1.5;
  font-size: 14px;
  word-break: break-word;
}

/* 用户消息样式 */
.user .content {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #fff;
  border-top-right-radius: 4px;
  margin-left: auto;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

/* 管理员消息样式 */
.admin .content {
  background: #fff;
  color: #1e293b;
  border-top-left-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
}

/* 时间戳样式 */
.time {
  font-size: 11px;
  color: #94a3b8;
  margin-top: 6px;
  opacity: 0.8;
}

/* 输入区域样式 */
.input-area {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

/* 输入框样式 */
input {
  flex: 1;
  padding: 12px 20px;
  border-radius: 25px;
  border: 2px solid #e2e8f0;
  background: #fff;
  transition: all 0.3s;
  font-size: 14px;
}

input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* 发送按钮样式 */
button {
  padding: 12px 28px;
  border: none;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #fff;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
}

button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

button:active {
  transform: translateY(0);
}

/* 消息动画 */
@keyframes fadeIn {
  from { 
    opacity: 0; 
    transform: translateY(10px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}
</style>

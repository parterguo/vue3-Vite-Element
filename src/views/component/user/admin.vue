<template>
  <div class="kf-container">
    <!-- 左侧在线用户列表 -->
    <div class="user-list">
      <h3>在线用户</h3>
      <el-scrollbar class="user-scroll">
        <div
          v-for="user in onlineUsers"
          :key="user.id"
          :class="['user-item', selectedUser?.id === user.id ? 'active' : '']"
          @click="selectUser(user)"
        >
          <el-avatar :src="user.avatar" size="40"></el-avatar>
          <div class="user-info">
            <div class="user-name">{{ user.name }}</div>
            <div class="last-msg">{{ user.lastMessage }}</div>
          </div>
        </div>
      </el-scrollbar>
    </div>

    <!-- 右侧聊天窗口 -->
    <div class="chat-area">
      <h3>{{ selectedUser ? selectedUser.name : '请选择用户' }}</h3>
      <div class="chat-box" ref="chatBox">
        <div
          v-for="(msg,index) in selectedMessages"
          :key="index"
          :class="msg.from==='kf1'?'msg user':'msg admin'"
        >
          <el-avatar :src="msg.avatar" size="40" class="avatar"></el-avatar>
          <div class="msg-content">
            <div class="name">{{ msg.name }}</div>
            <div class="content">{{ msg.content }}</div>
            <div class="time">{{ formatTime(msg.timestamp) }}</div>  
          </div>
        </div>
      </div>

      <!-- 修复：输入框永远显示 -->
      <div class="input-area">
        <input v-model="input" @keyup.enter="sendMessage" placeholder="请输入消息..." />
        <button @click="sendMessage">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, nextTick, watch } from "vue";
import { ElAvatar, ElScrollbar } from "element-plus";
import axios from "axios"; // 引入 axios

export default {
  name: "Admin",
  components: { ElAvatar, ElScrollbar },
  setup() {
    const ws = ref(null);
    const input = ref("");
    const chatBox = ref(null);
    const selectedUser = ref(null);

    const onlineUsers = reactive([]);
    const messagesMap = reactive({});

    const API_URL = "http://localhost:3000/api/data";
    const CHAT_HISTORY_KEY = "chat_history_user_admin";

    const adminName = "客服小郭";
    const adminAvatar =
      "https://img1.baidu.com/it/u=570016865,823055038&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500";

    const scrollToBottom = () => {
      nextTick(() => {
        if (chatBox.value) chatBox.value.scrollTop = chatBox.value.scrollHeight;
      });
    };

    // 保存聊天记录
    const saveHistory = async (userId) => {
      if (userId !== 'user1') return; // 暂时只处理与 user1 的聊天
      try {
        await axios.post(API_URL, {
          key: CHAT_HISTORY_KEY,
          value: messagesMap[userId] || [],
        });
      } catch (error) {
        console.error("保存聊天记录失败:", error);
      }
    };

    // 获取聊天记录
    const fetchHistory = async (userId) => {
      if (userId !== 'user1') return;
      try {
        const response = await axios.get(`${API_URL}/${CHAT_HISTORY_KEY}`);
        if (response.data && response.data.value) {
          messagesMap[userId] = response.data.value;
          // 如果当前选中的就是这个用户，则更新显示
          if (selectedUser.value && selectedUser.value.id === userId) {
            selectedMessages.value = messagesMap[userId];
            scrollToBottom();
          }
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log(`用户 ${userId} 暂无历史记录`);
        } else {
          console.error("获取聊天记录失败:", error);
        }
      }
    };

    onMounted(() => {
      // 默认加入一个测试用户
      const defaultUser = {
        id: "user1",
        name: "测试用户",
        avatar:
          "https://img2.baidu.com/it/u=372601434,3534902205&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        lastMessage: "",
      };
      onlineUsers.push(defaultUser);
      selectedUser.value = defaultUser;
      messagesMap[defaultUser.id] = [];

      // 加载历史记录
      fetchHistory(defaultUser.id);

      // 连接WebSocket
      ws.value = new WebSocket("ws://localhost:8080");
      ws.value.onopen = () => {
        ws.value.send(JSON.stringify({ type: "init", from: "kf1" }));
      };
      ws.value.onmessage = (e) => {
        const msg = JSON.parse(e.data);
        // 如果消息没有时间戳，添加当前时间
        if (!msg.timestamp) {
          msg.timestamp = Date.now();
        }
        
        // 只处理来自其他用户的消息，忽略自己发送的消息
        if (msg.from === "kf1") return;

        const userId = msg.from;
        if (!messagesMap[userId]) messagesMap[userId] = [];

        msg.name = msg.name || "用户A";
        msg.avatar = msg.avatar ||
          "https://img2.baidu.com/it/u=372601434,3534902205&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500";

        messagesMap[userId].push(msg);
        saveHistory(userId); // 收到消息后保存

        // 更新在线用户列表
        let user = onlineUsers.find((u) => u.id === userId);
        if (!user) {
          onlineUsers.push({
            id: userId,
            name: msg.name,
            avatar: msg.avatar,
            lastMessage: msg.content,
          });
        } else {
          user.lastMessage = msg.content;
        }

        // 如果当前选中的用户是消息发送者，更新消息列表
        if (selectedUser.value && selectedUser.value.id === userId) {
          selectedMessages.value = messagesMap[userId];
          scrollToBottom();
        }
      };
    });

    const selectedMessages = ref([]);

    const selectUser = (user) => {
      selectedUser.value = user;
      selectedMessages.value = messagesMap[user.id] || [];
      scrollToBottom();
    };

    const sendMessage = () => {
      if (!input.value || !selectedUser.value) return;

      const msg = {
        type: "chat",
        from: "kf1",
        to: selectedUser.value.id,
        content: input.value,
        timestamp: Date.now(),
        name: adminName,
        avatar: adminAvatar,
      };

      if (ws.value && ws.value.readyState === WebSocket.OPEN) {
        ws.value.send(JSON.stringify(msg));
        // 直接在发送后添加到本地列表，不再等待服务器回传
        if (!messagesMap[selectedUser.value.id]) messagesMap[selectedUser.value.id] = [];
        messagesMap[selectedUser.value.id].push(msg);
        
        // 保存历史记录
        saveHistory(selectedUser.value.id);

        selectedMessages.value = messagesMap[selectedUser.value.id];
        input.value = "";
        scrollToBottom();
      }
    };

    const formatTime = (ts) => new Date(ts).toLocaleTimeString();

    watch(selectedUser, () => {
      if (selectedUser.value) {
        selectedMessages.value = messagesMap[selectedUser.value.id] || [];
      }
    });

    return {
      input,
      onlineUsers,
      selectedUser,
      selectUser,
      sendMessage,
      chatBox,
      formatTime,
      selectedMessages,
    };
  },
};
</script>

<style scoped>
.kf-container {
  display: flex;
  height: 100vh;
  font-family: Arial;
  background: #f8fafc;
  padding: 20px;
  gap: 20px;
}

.user-list {
  width: 280px;
  border: none;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  padding: 20px;
}

.user-item {
  display: flex;
  align-items: center;
  padding: 12px;
  cursor: pointer;
  border-radius: 12px;
  margin-bottom: 8px;
  transition: all 0.3s ease;
}

.user-item:hover {
  background: #f1f5f9;
}

.user-item.active {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #fff;
}

.user-info {
  margin-left: 12px;
  flex: 1;
}

.user-name {
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 4px;
}

.last-msg {
  font-size: 12px;
  color: #64748b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  padding: 24px;
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

.chat-box::-webkit-scrollbar {
  width: 4px;
}

.chat-box::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}

.msg {
  display: flex;
  align-items: flex-start;
  margin-bottom: 24px;
  max-width: 85%;
  animation: fadeIn 0.3s ease;
  position: relative;
}

.user {
  margin-left: auto;
  flex-direction: row-reverse;
}

.admin {
  margin-right: auto;
  flex-direction: row;
}

.avatar {
  margin: 0 12px;
  border: 2px solid #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s;
}

.avatar:hover {
  transform: scale(1.05);
}

.msg-content {
  display: flex;
  flex-direction: column;
  max-width: 500px;
}

.name {
  font-size: 13px;
  color: #64748b;
  margin-bottom: 4px;
  font-weight: 500;
}

.content {
  padding: 12px 18px;
  border-radius: 18px;
  position: relative;
  line-height: 1.5;
  font-size: 14px;
  word-break: break-word;
}

.user .content {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #fff;
  border-top-right-radius: 4px;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

.admin .content {
  background: #fff;
  color: #1e293b;
  border-top-left-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
}

.time {
  font-size: 11px;
  color: #94a3b8;
  margin-top: 6px;
}

.input-area {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

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

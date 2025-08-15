/*
 * @Descripttion: 
 * @version: 
 * @Author: YaBing
 * @Date: 2025-08-15 13:54:16
 * @LastEditTime: 2025-08-15 15:24:51
 */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:admin123@cluster0.2nnezbk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('成功连接到 MongoDB');
}).catch(err => {
  console.error('连接 MongoDB 失败', err);
});

// Define a schema and model for the data
const dataSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true },
});

const Data = mongoose.model('Data', dataSchema);

// API Routes
// Create/Update data
app.post('/api/data', async (req, res) => {
  const { key, value } = req.body;
  if (!key || value === undefined) {
    return res.status(400).json({ error: 'Key and value are required' });
  }
  try {
    const data = await Data.findOneAndUpdate({ key }, { value }, { new: true, upsert: true });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: '存储数据时出错' });
  }
});

// Get data
app.get('/api/data/:key', async (req, res) => {
  try {
    const data = await Data.findOne({ key: req.params.key });
    if (!data) {
      return res.status(404).json({ error: '未找到数据' });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: '获取数据时出错' });
  }
});

app.listen(PORT, () => {
  console.log(`HTTP REST API 服务器已启动，端口 ${PORT}`);
});

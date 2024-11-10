const express = require('express');
const app = express();
const PORT = 3000;

// メモデータを格納するための配列
let memos = [];

// 静的ファイルを提供（index.htmlなど）
app.use(express.static('public'));

// JSONデータの処理を設定
app.use(express.json());

// メモの一覧を取得するエンドポイント
app.get('/api/memos', (req, res) => {
  res.json(memos);
});

// 新しいメモを追加するエンドポイント
app.post('/api/memos', (req, res) => {
  const { text } = req.body;
  if (text) {
    memos.push({ text });
    res.status(201).json({ message: 'メモが追加されました！' });
  } else {
    res.status(400).json({ message: 'メモの内容が空です' });
  }
});

// サーバーを指定ポートで起動
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

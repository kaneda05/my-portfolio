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
  const { title, content } = req.body;
  if (title && content) {
    const createdAt = new Date().toLocaleString(); // 作成日時を追加
    memos.push({ title, content, createdAt });
    res.status(201).json({ message: 'メモが追加されました！' });
  } else {
    res.status(400).json({ message: '題名または内容が空です' });
  }
});

// メモを削除するエンドポイント
app.delete('/api/memos/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < memos.length) {
    memos.splice(index, 1); // 指定したインデックスのメモを削除
    res.status(200).json({ message: 'メモが削除されました！' });
  } else {
    res.status(404).json({ message: 'メモが見つかりません' });
  }
});

// メモを更新するエンドポイント
app.put('/api/memos/:index', (req, res) => {
  const index = parseInt(req.params.index);
  const { title, content } = req.body;
  if (index >= 0 && index < memos.length && title && content) {
    memos[index].title = title; // メモの題名を更新
    memos[index].content = content; // メモの内容を更新
    res.status(200).json({ message: 'メモが更新されました！' });
  } else {
    res.status(400).json({ message: '無効なインデックスまたは題名/内容' });
  }
});

// サーバーを指定ポートで起動
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

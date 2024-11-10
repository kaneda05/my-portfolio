## 追加機能についての解説

### 概要
ユーザーがメモを入力して「追加」ボタンを押すことで新しいメモがサーバーに保存され、メモ一覧に表示されます。

```javascript:フロントエンド（index.html）のコード
document.getElementById('memoForm').addEventListener('submit', async (e) => {
  e.preventDefault();  // フォーム送信によるページリロードを防止
  const memoInput = document.getElementById('memoInput');
  const text = memoInput.value.trim();  // 入力欄のテキストを取得して空白を除去
  if (text) {
    await fetch('/api/memos', {  // サーバーに新しいメモをPOSTリクエストで送信
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })  // 入力されたメモ内容をJSON形式で送信
    });
    memoInput.value = '';  // 送信後に入力欄をクリア
    fetchMemos();  // 新しいメモ一覧を取得して再表示
  }
});
```

```javascript:サーバーサイド（server.js）のコード
app.post('/api/memos', (req, res) => {
  const { text } = req.body;
  if (text) {
    const createdAt = new Date().toLocaleString();  // 作成日時を取得
    memos.push({ text, createdAt });  // メモを配列に保存
    res.status(201).json({ message: 'メモが追加されました！' });
  } else {
    res.status(400).json({ message: 'メモの内容が空です' });
  }
});

```

## 動作の流れ
1. メモが入力され「追加」ボタンが押されると、submitイベントが発生し、POSTリクエストで新しいメモがサーバーに送信
2. サーバー側でメモと作成日時が保存され、保存完了のメッセージが返される
3. フロントエンドではメモ入力欄をクリアし、メモ一覧を再表示するためにfetchMemos()が呼び出される
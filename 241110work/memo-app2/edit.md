## 編集機能についての解説

### 概要
ユーザーがメモのテキスト部分をクリックすると編集用の入力欄に切り替わり、内容の変更ができます。

```javascript:フロントエンド（index.html）のコード
span.onclick = () => {
  span.style.display = 'none';  // テキスト表示を隠す
  input.style.display = 'inline';  // 編集用入力欄を表示
};
input.onblur = async () => {
  const updatedText = input.value.trim();
  if (updatedText) {
    await fetch(`/api/memos/${index}`, {  // 編集内容をPUTリクエストで送信
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: updatedText })
    });
    fetchMemos();  // 最新のメモ一覧を表示
  }
};
```

```javascript:サーバーサイド（server.js）のコード
app.put('/api/memos/:index', (req, res) => {
  const index = parseInt(req.params.index);
  const { text } = req.body;
  if (index >= 0 && index < memos.length && text) {
    memos[index].text = text;  // メモの内容を更新
    res.status(200).json({ message: 'メモが更新されました！' });
  } else {
    res.status(400).json({ message: '無効なインデックスまたはテキスト' });
  }
});

```

## 動作の流れ
1. メモのテキスト部分をクリックすると、spanタグが隠れ、編集用のinputが表示
2. ユーザーが編集を終えて入力欄からフォーカスが外れると、PUTリクエストで更新内容がサーバーに送信
3. サーバーで内容が更新され、成功メッセージが返されると、フロントエンドでfetchMemos()が呼ばれ、最新のメモ一覧が表示
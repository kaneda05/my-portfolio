## 削除機能についての解説

### 概要
メモの横にある「削除」ボタンをクリックすることで、そのメモを一覧から削除できます。

```javascript:フロントエンド（index.html）のコード
deleteButton.onclick = async () => {
  await fetch(`/api/memos/${index}`, { method: 'DELETE' });  // 削除リクエスト送信
  fetchMemos();  // メモ一覧を再取得して表示
};
```

```javascript:サーバーサイド（server.js）のコード
app.delete('/api/memos/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < memos.length) {
    memos.splice(index, 1);  // 指定されたインデックスのメモを削除
    res.status(200).json({ message: 'メモが削除されました！' });
  } else {
    res.status(404).json({ message: 'メモが見つかりません' });
  }
});
```

## 動作の流れ
1. ユーザーが「削除」ボタンを押すと、指定されたインデックスのメモを削除するDELETEリクエストがサーバーに送信
2. サーバー側でメモの配列から指定インデックスのメモが削除され、成功メッセージが返される
3. フロントエンドでfetchMemos()が呼ばれ、最新のメモ一覧が表示
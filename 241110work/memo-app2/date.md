## 編集機能についての解説

### 概要
メモが作成された日時を表示し、いつ追加されたものかを確認できるようにします。

```javascript:フロントエンド（index.html）のコード
const createdAt = new Date().toLocaleString();  // 作成日時を取得
memos.push({ text, createdAt });  // サーバー側でメモと一緒に保存

// フロントエンドでの表示部分
const dateDiv = document.createElement('div');
dateDiv.style.fontSize = '0.8em';
dateDiv.style.color = 'gray';
dateDiv.textContent = `作成日時: ${memo.createdAt}`;
div.appendChild(dateDiv);  // メモの下に日時を表示

```

## 動作の流れ
1. メモがサーバーに追加される際に、作成日時が記録され、配列に保存
2. メモ一覧を表示する際、各メモの下に作成日時が追加
3. これにより、各メモがいつ追加されたかが確認
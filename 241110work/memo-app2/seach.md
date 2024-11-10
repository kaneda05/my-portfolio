## 削除機能についての解説

### 概要
キーワードでメモを検索し、特定のメモのみをフィルターして表示します。

```javascript:フロントエンド（index.html）のコード
function searchMemos() {
  const searchText = document.getElementById('searchInput').value.toLowerCase();
  const filteredMemos = allMemos.filter(memo => memo.text.toLowerCase().includes(searchText));
  displayMemos(filteredMemos);  // フィルターされたメモのみ表示
}

```

## 動作の流れ
1. ユーザーが検索ボックスにキーワードを入力するとsearchMemos()が呼び出され、全メモからキーワードを含むものだけを抽出
2. filterメソッドを使用して、検索キーワードを含むメモをfilteredMemosとして取得し、それを表示
3. これにより、特定のキーワードに一致するメモのみが表示され、目的のメモを簡単に見つけることができる
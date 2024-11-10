## 題名と内容を分けて表示

### 概要
メモのフォームに「題名」(memoTitle)と「内容」(memoContent)の2つのフィールドを追加しました。
これにより、ユーザーはメモの題名と内容を別々に入力できるようになります。

```html:フロントエンド（index.html）のコード
<form id="memoForm">
  <input type="text" id="memoTitle" placeholder="題名を入力" required>
  <textarea id="memoContent" placeholder="メモの内容を入力" required></textarea>
  <button type="submit">メモを追加</button>
</form>

```

### 動作の流れ
- inputタグで「題名」を入力、textareaタグで「内容」を入力できるようにしています。
- ユーザーはメモの「題名」と「内容」をそれぞれ入力して「メモを追加」ボタンを押すと、その内容がサーバーに送信され、新しいメモが保存されます。



## タイトルと内容の表示
メモ一覧では、titleとcontentを別々に表示します。これにより、ユーザーがメモの詳細を確認しやすくなります。
```javascript:フロントエンド（index.html）のコード
function displayMemos(memos) {
  const memoList = document.getElementById('memoList');
  memoList.innerHTML = '';
  memos.forEach((memo, index) => {
    const div = document.createElement('div');
    div.classList.add('memo');

    const titleSpan = document.createElement('span');
    titleSpan.textContent = memo.title;  // 題名を表示

    const contentSpan = document.createElement('p');
    contentSpan.textContent = memo.content;  // 内容を表示

    const dateDiv = document.createElement('div');
    dateDiv.classList.add('date');
    dateDiv.textContent = `作成日時: ${memo.createdAt}`;

    const editButton = document.createElement('button');
    editButton.textContent = '編集';
    editButton.onclick = () => editMemo(index, memo);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '削除';
    deleteButton.onclick = async () => {
      await fetch(`/api/memos/${index}`, { method: 'DELETE' });
      fetchMemos();
    };

    div.appendChild(titleSpan);
    div.appendChild(contentSpan);
    div.appendChild(editButton);
    div.appendChild(deleteButton);
    div.appendChild(dateDiv);

    memoList.appendChild(div);
  });
}

```
### 変更点
- メモが表示される際、title（題名）とcontent（内容）を個別に表示します。
- メモには「編集」と「削除」ボタンも表示され、各メモの操作が可能です。
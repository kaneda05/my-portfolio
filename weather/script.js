let history = JSON.parse(localStorage.getItem('weatherHistory')) || []; // ローカルストレージから履歴を取得

document.getElementById('getWeather').addEventListener('click', function() {
    const city = document.getElementById('city').value;
    const apiKey = 'c31e404858dd44c88deb3a5c0d9b0883'; // ここにあなたのAPIキーを入力
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const weatherInfo = {
                    name: data.name,
                    temp: data.main.temp,
                    description: data.weather[0].description,
                };

                // 天気情報を表示
                const weatherData = `
                    <h3>${weatherInfo.name}の天気</h3>
                    <p>温度: ${weatherInfo.temp} °C</p>
                    <p>天候: ${weatherInfo.description}</p>
                `;
                document.getElementById('weatherData').innerHTML = weatherData;

                // 履歴に追加
                addToHistory(weatherInfo);
            } else {
                document.getElementById('weatherData').innerHTML = '<p>都市名を確認してください。</p>';
            }
        })
        .catch(error => {
            document.getElementById('weatherData').innerHTML = '<p>天気情報の取得に失敗しました。</p>';
        });
});

// 履歴に天気情報を追加する関数
function addToHistory(weatherInfo) {
    history.push(weatherInfo);
    localStorage.setItem('weatherHistory', JSON.stringify(history)); // 履歴をローカルストレージに保存
    updateHistoryDisplay();
}

// 履歴を表示する関数
function updateHistoryDisplay() {
    const historyList = document.getElementById('historyList');
    const searchValue = document.getElementById('search').value.toLowerCase(); // 検索フィールドの値
    historyList.innerHTML = ''; // 既存の履歴をクリア

    history.forEach((info, index) => {
        if (info.name.toLowerCase().includes(searchValue)) { // 検索結果にフィルタリング
            const listItem = document.createElement('li');
            listItem.className = 'history-item';
            listItem.innerText = `${info.name}: 温度 ${info.temp} °C, 天候 ${info.description}`;

            // 削除ボタンを作成
            const deleteButton = document.createElement('button');
            deleteButton.innerText = '削除';
            deleteButton.addEventListener('click', () => {
                history.splice(index, 1); // 履歴から削除
                localStorage.setItem('weatherHistory', JSON.stringify(history)); // 更新された履歴を保存
                updateHistoryDisplay(); // 履歴を再表示
            });

            listItem.appendChild(deleteButton); // リストアイテムに削除ボタンを追加
            historyList.appendChild(listItem); // リストにアイテムを追加
        }
    });
}

// ページがロードされたときに履歴を表示
window.onload = updateHistoryDisplay;

// 検索フィールドにイベントリスナーを追加
document.getElementById('search').addEventListener('input', updateHistoryDisplay);

// 履歴をリセットするボタンのイベントリスナーを追加
document.getElementById('resetHistory').addEventListener('click', function() {
    if (confirm("履歴を本当にリセットしますか？")) {
        history = []; // 履歴をクリア
        localStorage.removeItem('weatherHistory'); // ローカルストレージから履歴を削除
        updateHistoryDisplay(); // 履歴を再表示
    }
});

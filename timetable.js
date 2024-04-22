async function showTimeTable() {
    if (document.querySelector("#col2of2 > div > nav > h2")?.textContent !== '大学からのお知らせ') {
        return;
    }

    const favoritesList = document.querySelector("#otherSitesCategorWrap > div.moresites-left-col > div > ul");
    const lectures = Array.from(favoritesList.children);
    const classSchedule = await getDayAndPeriod();
    console.log(classSchedule);
    const nowLecture = [];

    lectures.forEach(lecture => {
        const title = lecture.querySelector('.fullTitle')?.innerText.trim() || "タイトルなし";
        const link = lecture.querySelector("div > a")?.href || "リンクなし";
        const lecture_id = link.substring(link.lastIndexOf('/') + 1);

        if (lecture_id.includes('2024')) {
            const timeInfo = classSchedule.find(item => lecture_id.includes(item.classCode));
            nowLecture.push({
                title,
                link,
                lecture_id,
                timeTable: timeInfo ? timeInfo.timeTable : "時間情報なし"
            });
        }
    });

    console.log(nowLecture);

    createScheduleTable(nowLecture);
}

function getDayAndPeriod() {
    return new Promise((resolve, reject) => {
        fetch(`https://kibaco.tmu.ac.jp/portal/site/user/tool/20485f66-b6b0-4364-963b-7d0bde97d106`)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            const tableRows = doc.querySelectorAll("#currentSites tbody tr");
            const classSchedule = [];

            tableRows.forEach(row => {
                const classCode = row.querySelector('td[headers="classcode"]').textContent.trim();
                const timeTable = row.querySelector('td[headers="timetable"]').textContent.trim();
                classSchedule.push({ classCode, timeTable });
            });

            resolve(classSchedule);
        })
        .catch(error => {
            console.error('Error fetching HTML:', error);
            reject(error);
        });
    });
}

function createScheduleTable(classes) {
    // まずは時間割のデータを整理します。
    const schedule = Array.from(Array(6), () => new Array(6).fill(null));  // 6行（1限から6限）、6列（月曜から土曜）

    // 授業データを適切な位置に配置
    classes.forEach(cls => {
        const match = cls.timeTable.match(/(\D)(\d)/);  // 例えば "月4" から曜日と時限を抽出
        if (match) {
            const dayIndex = "月火水木金土".indexOf(match[1]);  // 曜日をインデックスに変換
            const periodIndex = parseInt(match[2], 10) - 1;  // 1限が0のインデックスになるように
            if (dayIndex !== -1 && periodIndex >= 0 && periodIndex < 6) {
                schedule[periodIndex][dayIndex] = cls;  // 授業をスケジュールに追加
            }
        }
    });

    // HTMLテーブルの生成
    const table = document.createElement('table');
    table.className = 'table table-bordered';

    // テーブルのヘッダ
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = '<th>時限\\曜日</th><th>月</th><th>火</th><th>水</th><th>木</th><th>金</th><th>土</th>';
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // テーブルのボディ
    const tbody = document.createElement('tbody');
    schedule.forEach((period, index) => {
        const row = document.createElement('tr');
        const periodCell = document.createElement('td');
        periodCell.textContent = `${index + 1}限`;
        row.appendChild(periodCell);

        period.forEach((cls) => {
            const cell = document.createElement('td');
            if (cls) {
                cell.innerHTML = `<a href="${cls.link}">${cls.title}</a>`;
            }
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    
    // 表をページに追加
    const target = document.querySelector("#col1of2");
    if (target && table) {
        target.insertBefore(table, target.firstChild);
    } else {
        console.error("対象の要素または時間割表が見つかりません。");
    }
}




// ページが読み込まれたときに timeTalbe 関数を実行する
window.addEventListener("load", showTimeTable);

function notification() {
    // マイページか確認
    if (document.querySelector("#col2of2 > div > nav > h2").textContent != '大学からのお知らせ') {
        return false;
    }
    const url = document.querySelector("#toolMenu > ul > li:nth-child(5) > a").href;
    const id = url.substring(url.lastIndexOf('/') + 1);
    displayAnnouncements(id);
}

function displayAnnouncements(id) {
    const segment = document.createElement('div');
    segment.className = 'Mrphs-container Mrphs-sakai-mytask';

    segment.innerHTML = `

<div class="Mrphs-toolBody Mrphs-toolBody--sakai-mytask">
<iframe name="Main${id}" id="Main${id}" title="お知らせ " class="portletMainIframe" height="100000" width="100%" frameborder="0" marginwidth="0" marginheight="0" scrolling="auto" allowfullscreen="allowfullscreen" allow="autoplay *;fullscreen *;encrypted-media *;camera 'self';microphone 'self'" src="https://kibaco.tmu.ac.jp/portal/tool/${id}?panel=Main" style="height: 10000px;">
</iframe>
</div>

    </div>`;


    // 表をページに追加
    const target = document.querySelector("#col2of2")
    target.insertBefore(segment, target.firstChild);
}


// ページを開いた時に notification 関数を実行
window.addEventListener("load", notification);




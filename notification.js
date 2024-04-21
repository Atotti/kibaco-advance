function notification() {
    // マイページか確認
    if (document.querySelector("#col2of2 > div > nav > h2").textContent != '大学からのお知らせ') {
        return false;
    }
    // お知らせを取得
    const url = 'https://kibaco.tmu.ac.jp/direct/announcement/user.json';

    // fetch API を使用してデータを非同期に取得
    fetch(url)
    .then(response => {
        // レスポンスが正常に受け取れた場合、JSON に変換
        if (response.ok) {
            return response.json();
        }
        // レスポンスが異常な場合、エラーを投げる
        throw new Error('Network response was not ok.');
    })
    .then(data => {
        // JSON 形式のデータを処理して DOM に追加

        // お知らせページを作成するための要素を生成
        displayAnnouncements(data);
    })
    .catch(error => {
        // エラー発生時の処理
        console.error('There was a problem with your fetch operation:', error);
    });
}

function displayAnnouncements(data) {
    // 表を作成
    const table = document.createElement('table');
    table.className = 'table table-hover table-striped table-bordered';
    table.innerHTML = `
        <tr> 
            <th>&nbsp;</th>
            <th>配信者</th>
            <th>タイトル</th>
            <th>公開日</th>
        </tr>
    `;

    // データ行を追加
    data.announcement_collection.forEach(announcement => {
        const row = table.insertRow(-1);

        const cellAttachment = row.insertCell(0);
        cellAttachment.innerHTML = announcement.attachments.length > 0 ? '📎' : '&nbsp;';
        
        const cellSiteTitle = row.insertCell(1);
        cellSiteTitle.textContent = announcement.createdByDisplayName;

        const cellTitle = row.insertCell(2);
        const link = announcement.entityURL.replace(':main:', '/tool/').replace('/direct/announcement/', '/portal/site/');
        cellTitle.innerHTML = `<a href="${link}" target="_top">${announcement.title}</a>`;

        const cellCreatedOn = row.insertCell(3);
        const createdDate = new Date(announcement.createdOn);
        cellCreatedOn.textContent = `${createdDate.getFullYear()}/${createdDate.getMonth()+1}/${createdDate.getDate()} ${createdDate.getHours()}:${createdDate.getMinutes()}`;
    });

    const segment = document.createElement('div');
    segment.className = 'Mrphs-container Mrphs-sakai-mytask';

    segment.innerHTML = `

    <nav class="Mrphs-toolTitleNav Mrphs-container--toolTitleNav">

                
                    
    <h2 class="Mrphs-toolTitleNav__title">
        <a class="Mrphs-toolTitleNav__link--inline" href="https://kibaco.tmu.ac.jp/portal/tool-reset/be563520-8976-437f-b9d7-6d9e9d8b98a0/" target="Mainbe563520x8976x437fxb9d7x6d9e9d8b98a0" title="リセット: お知らせ">
            <span class="Mrphs-toolTitleNav__link Mrphs-toolTitleNav__link--reset"></span>
            <span class="Mrphs-toolTitleNav__text">お知らせ</span>
        </a>
        <span class="Mrphs-toolTitleNav__addLeft"></span>
    </h2>

 

<div class="Mrphs-toolTitleNav__button_container home">



<span class="Mrphs-toolTitleNav__addRight"></span>

<button class="Mrphs-toolTitleNav__link Mrphs-toolTitleNav__link--directurl" rel="#Mainbe563520x8976x437fxb9d7x6d9e9d8b98a0_directurl" title="この機能へのダイレクトリンク" aria-haspopup="dialog">
    <span class="Mrphs-itemTitle">リンク</span>
</button>
<div id="Mainbe563520x8976x437fxb9d7x6d9e9d8b98a0_directurl" role="dialog" aria-labelledby="Mainbe563520x8976x437fxb9d7x6d9e9d8b98a0_directurl__title" class="Mrphs-directUrl Mrphs-directUrl__dropDown">
    <i class="fa fa-times dropDown_close" aria-hidden="true" tabindex="0"></i>
    <label for="Mainbe563520x8976x437fxb9d7x6d9e9d8b98a0_urlholder" id="Mainbe563520x8976x437fxb9d7x6d9e9d8b98a0_directurl__title" class="dropDown_title">この機能へのダイレクトリンク</label>
    
        <input tabindex="0" type="checkbox" id="directToolUrl-1" onclick="toggleShortUrlOutput('https://kibaco.tmu.ac.jp/portal/directtool/be563520-8976-437f-b9d7-6d9e9d8b98a0/', this, 'Mainbe563520x8976x437fxb9d7x6d9e9d8b98a0_urlholder');" class="Mrphs-directUrl__checkbox"><label for="directToolUrl-1">短縮 URL</label>

     
    <textarea name="Mainbe563520x8976x437fxb9d7x6d9e9d8b98a0_urlholder" id="Mainbe563520x8976x437fxb9d7x6d9e9d8b98a0_urlholder" tabindex="0" class="Mrphs-directUrl__textarea Mainbe563520x8976x437fxb9d7x6d9e9d8b98a0_urlholder">https://kibaco.tmu.ac.jp/portal/directtool/be563520-8976-437f-b9d7-6d9e9d8b98a0/</textarea>
</div>



<sakai-maximise-button><!---->

<a class="Mrphs-toolTitleNav__link" href="javascript;" title="クリックすると，この機能を全画面表示します" aria-label="クリックすると，この機能を全画面表示します">
<fa-icon i-class="fas expand-arrows-alt" path-prefix="/webcomponents/assets">
</fa-icon></a>
<!----></sakai-maximise-button>

                                <button class="Mrphs-toolTitleNav__link" type="button" onclick="document.getElementById('tool-reset-kibaco').click()">
    <span>リセットしてお知らせトップに戻る</span>
</button>

</div>

</nav> 
                    
    <div class="portletMainIframe" height="475" width="100%" frameborder="0" marginwidth="0" marginheight="0" scrolling="auto" allowfullscreen="allowfullscreen" allow="autoplay *;fullscreen *;encrypted-media *;camera 'self';microphone 'self'" style="height: 260px;">
    
    <div class="portletBody" style="margin: 16px;">
         
     
    <!-- END Tool Header -->

    <!-- START Tool Body -->

    <div class="navPanel">
        <div class="listNav">
            <div class="instruction">
               　              　　　 <!-- task 1309 modified from -->
                                    n件のうち 1 - n 　件目を表示
                                <!-- task 1309 modified to -->
            </div>
                                                <form name="firstpageForm" class="inlineForm" method="post" action="https://kibaco.tmu.ac.jp/portal/tool/be563520-8976-437f-b9d7-6d9e9d8b98a0?panel=Main">
                        <input type="submit" name="eventSubmit_doList_first" value="|<" disabled="disabled">
                        <input type="hidden" name="sakai_csrf_token" value="f883858191ed53d467606202ef71f94f0867ac3dc71c1c31925b3071181fe2bd">
                    </form>
                                                    <form name="prevpageForm" class="inlineForm" method="post" action="https://kibaco.tmu.ac.jp/portal/tool/be563520-8976-437f-b9d7-6d9e9d8b98a0?panel=Main">
                        <input type="submit" name="eventSubmit_doList_prev" value="<" disabled="disabled">
                        <input type="hidden" name="sakai_csrf_token" value="f883858191ed53d467606202ef71f94f0867ac3dc71c1c31925b3071181fe2bd">
                    </form>
                                        <form name="pagesizeForm" class="inlineForm" method="post" action="https://kibaco.tmu.ac.jp/portal/tool/be563520-8976-437f-b9d7-6d9e9d8b98a0?panel=Main">
                <input type="hidden" name="eventSubmit_doChange_pagesize" value="changepagesize">
                <label for="selectPageSize" class="skip">Enter キーを押し，メニューをスクロールする場合は Alt キーを押しながら上下矢印を押します</label>
                <select id="selectPageSize" name="selectPageSize" onchange="blur();document.pagesizeForm.submit();">
                                            
                                                                            <option value="5" selected="selected">5 件表示...</option>
                                                                                            
                                                                            <option value="10">10 件表示...</option>
                                                                                            
                                                                            <option value="20">20 件表示...</option>
                                                                                            
                                                                            <option value="50">50 件表示...</option>
                                                                                            
                                                                            <option value="100">100 件表示...</option>
                                                                                            
                                                                            <option value="200">200 件表示...</option>
                                                                                    </select>
                <input type="hidden" name="sakai_csrf_token" value="f883858191ed53d467606202ef71f94f0867ac3dc71c1c31925b3071181fe2bd">
            </form>
            
                                                <form name="nextpageForm" class="inlineForm" method="post" action="https://kibaco.tmu.ac.jp/portal/tool/be563520-8976-437f-b9d7-6d9e9d8b98a0?panel=Main">
                        <input type="submit" name="eventSubmit_doList_next" value=">" disabled="disabled">
                        <input type="hidden" name="sakai_csrf_token" value="f883858191ed53d467606202ef71f94f0867ac3dc71c1c31925b3071181fe2bd">
                    </form>
                                                    <form name="lastpageForm" class="inlineForm" method="post" action="https://kibaco.tmu.ac.jp/portal/tool/be563520-8976-437f-b9d7-6d9e9d8b98a0?panel=Main">
                        <input type="submit" name="eventSubmit_doList_last" value=">|" disabled="disabled">
                        <input type="hidden" name="sakai_csrf_token" value="f883858191ed53d467606202ef71f94f0867ac3dc71c1c31925b3071181fe2bd">
                    </form>
                                    </div>
    </div>
        


<div class="Mrphs-toolBody Mrphs-toolBody--sakai-mytask">
<script type="text/javascript" language="JavaScript">
  focus_path = ["search"];
</script>
<script type="text/javascript">
var linkFlag = true;

function allowClick(object)
{
        object.onclick='';
     object.style.color='#000';
     var rv = linkFlag;
          linkFlag = false;
          return rv;
}
</script>

</div></div></div>`;

    const toolBody = segment.querySelector('.Mrphs-toolBody');
    toolBody.appendChild(table);


    // 表をページに追加
    const target = document.querySelector("#col2of2")
    target.insertBefore(segment, target.firstChild);
}


// ページを開いた時に notification 関数を実行
window.addEventListener("load", notification);




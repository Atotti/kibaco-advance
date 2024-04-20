function notification() {
    // マイページか確認
    if (document.querySelector("#col2of2 > div > nav > h2").textContent != '大学からのお知らせ') {
        return;
    }
    // 授業情報をお気に入りから取得
    const fav = document.querySelector("#topnav > li:nth-child(2) > a.link-container");
    consolee.log(fav);


}




// ページが読み込まれたときに notification 関数を実行する
window.addEventListener("load", notification);

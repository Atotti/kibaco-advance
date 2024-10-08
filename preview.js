// ページが読み込まれたときに実行される関数
function addPdf() {
    // 確認ページか判定
    try {
      let progres = document.querySelector("#col1 > div > div > div.progress-container > div:nth-child(2) > div");
      let disp = document.querySelector("#col1 > div > div > h3").textContent;
      if (progres.style.width == "33.3333%" && disp.includes("提出確認")) {

        // PDFを見つける
        let pdf_doc = document.querySelector("#col1 > div > div > ul > li > a");
        
        // PDFが見つかったら表示
        if (String(pdf_doc).slice(-4) == ".pdf") {
          // PDFを表示するためのiframe要素を作成する
          let iframe = document.createElement("iframe");
          iframe.src = pdf_doc;
          iframe.width = "100%";
          iframe.height = "800px";
          iframe.style.border = "4px solid green";
      
          // PDFを追加する場所を見つける
          let target = document.querySelector("#col1 > div > div");
      
          // iframe要素を追加する
          target.appendChild(iframe);
          // png, jpg画像の場合も表示させる
        } else if((String(pdf_doc).slice(-4) == ".png") || (String(pdf_doc).slice(-4) == ".jpg" )) {
          // 画像を表示するためのimg要素を作成する
          let img = document.createElement("img");
          img.src = pdf_doc;
          img.width = "100%";
          img.height = "800px";
          img.style.border = "4px solid green";
          // 丸くする
          img.style.borderRadius = "10px";
          // css指定用のクラスを追加
          img.className = "preview"
      
          // 画像を追加する場所を見つける
          let target = document.querySelector("#col1 > div > div");
      
          // img要素を追加する
          target.appendChild(img);
        }
    }
  } catch {
    
  }
}
  
// ページが読み込まれたときにaddPdf関数を実行する
window.addEventListener("load", addPdf);
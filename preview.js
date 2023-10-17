// ページが読み込まれたときに実行される関数
function addPdf() {

    // PDFを見つける
    let pdf_doc = document.querySelector("#col1 > div > div > ul > li > a");
    
    // PDFが見つかったら表示
    if (String(pdf_doc).includes(".pdf")) {
      // PDFを表示するためのiframe要素を作成する
      let iframe = document.createElement("iframe");
      iframe.src = pdf_doc;
      iframe.width = "100%";
      iframe.height = "800px";
      iframe.style.border = "none";
  
      // PDFを追加する場所を見つける
      let target = document.querySelector("#col1 > div > div");
  
      // iframe要素を追加する
      target.appendChild(iframe);
    }
}
  
// ページが読み込まれたときにaddPdf関数を実行する
window.addEventListener("load", addPdf);
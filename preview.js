// Xpathから要素を取得する関数

document.getElementByXPath = function(sValue) { var a = this.evaluate(sValue, this, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); if (a.snapshotLength > 0) { return a.snapshotItem(0); } };

// ページが読み込まれたときに実行される関数
function addPdf() {
    // 確認ページか判定
    let progres = document.querySelector("#col1 > div > div > div.progress-container > div:nth-child(2) > div");
    if (progres.style.width == "33.3333%") {

      // PDFを見つける
      let pdf_doc = document.querySelector("#col1 > div > div > ul > li > a");
      
      // PDFが見つかったら表示
      if (String(pdf_doc).includes(".pdf")) {
        // PDFを表示するためのiframe要素を作成する
        let iframe = document.createElement("iframe");
        iframe.src = pdf_doc;
        iframe.width = "200%";
        iframe.height = "200%";
        iframe.style.border = "none";

        // tbodyを取得
        let tbody = document.querySelector("#col1 > div > div > table > tbody");

        // tbodyを削除
        tbody.remove();

        // 横に並べるためのfield要素を作成する
        let field = document.createElement("div");

        // field要素にclass名を追加する
        field.className = "field";

        // field要素に横並び表示させるcssを追加する
        field.style.display = "flex";
        field.style.justifyContent = "space-between";

        // field要素にtobodyとpdfを追加する
        field.appendChild(tbody);
        field.appendChild(iframe);

        // field要素を追加する場所を見つける
        table = document.querySelector("#col1 > div > div > table");

        // field要素を追加する
        table.appendChild(field);
      }
    }
}
  
// ページが読み込まれたときにaddPdf関数を実行する
window.addEventListener("load", addPdf);
// 資料ページ（Resources）かどうか確認してボタンを挿入
function isResourcePage() {
  // 資料ツールのページURL、またはタイトル要素のどちらかで判定
  const isResourceTool = /\/tool\//.test(location.pathname)
    && !!document.querySelector('h2.Mrphs-toolTitleNav__title, [class*="toolTitleNav"]');
  return isResourceTool && !!document.querySelector('table');
}

function insertButton() {
  if (document.getElementById('kibaco-zip-btn')) return;

  const copyBtn = document.getElementById('copy-button');
  if (!copyBtn) return;

  const btn = document.createElement('button');
  btn.id = 'kibaco-zip-btn';
  btn.type = 'button';
  btn.className = 'btn btn-sm';
  btn.textContent = '⬇ ZIP DL';
  btn.title = 'Download all files as ZIP (preserving folder structure)';

  // 紺色・角丸復活・btn-groupのくっつき解消
  btn.style.cssText = `
    margin-left: 8px !important;
    border-radius: 4px !important;
    background: #1a6496 !important;
    color: #fff !important;
    border: none !important;
    font-weight: bold;
  `;

  btn.onclick = downloadZip;   // ← これが抜けていたので反応しなくなっていました

  copyBtn.insertAdjacentElement('afterend', btn);
}

async function downloadZip() {
  const btn = document.getElementById('kibaco-zip-btn');
  btn.textContent = 'Loading…';
  btn.disabled = true;

  try {
    // --- 案A: DOMではなくSakai Content APIから階層取得（「すべて展開」不要）---
    const m = location.pathname.match(/\/site\/([^/]+)/);
    const siteId = m ? m[1] : null;
    if (!siteId) { alert('Failed to get site ID.'); throw new Error('no siteId'); }

    const apiRes = await fetch(
      `/direct/content/resources/group/${siteId}.json?depth=10`,
      { credentials: 'include', headers: { Accept: 'application/json' } }
    );
    if (!apiRes.ok) { alert(`資料一覧の取得に失敗しました (${apiRes.status})`); throw new Error('api ' + apiRes.status); }

    const data = await apiRes.json();
    const root = data?.content_collection?.[0];
    if (!root) { alert('資料一覧の取得に失敗しました (invalid response)'); throw new Error('invalid api response'); }
    // 再帰でファイルを収集（フォルダ階層をzipPathとして保持）
    const files = [];
    (function walk(node, path) {
      const isFolder = node.type && node.type.includes('folder');
      if (isFolder) {
        const newPath = path + node.name + '/';
        (node.resourceChildren || []).forEach(c => walk(c, newPath));
      } else {
        files.push({ url: node.url, zipPath: (path + node.name).replace(/^\/+/, '').replace(/\.\.[/\\]/g, '') });
      }
    })(root, '');   // ルートフォルダ名から始まる（例: "2027卒情報科学科キャリア/...")

    if (files.length === 0) { alert('ファイルが見つかりませんでした。'); throw new Error('no files'); }

    const zip = new JSZip();
    let done = 0;

    for (const f of files) {
      btn.textContent = `${++done} / ${files.length}`;
      try {
        const res = await fetch(f.url, { credentials: 'include' });
        if (!res.ok) { console.warn(`SKIP: ${f.zipPath} (${res.status})`); continue; }
        const blob = await res.blob();
        zip.file(f.zipPath, blob);
      } catch (e) {
        console.error(`ERROR: ${f.zipPath}`, e);
      }
    }

    const content = await zip.generateAsync({ type: 'blob' });
    const dlUrl = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = dlUrl;
    a.download = `${(root.name || siteId).replace(/[/\\:*?"<>|]/g, '_').slice(0, 200)}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(dlUrl);

    btn.textContent = 'DONE.';
  } catch (e) {
    console.error(e);
    btn.textContent = 'エラー';
  } finally {
    setTimeout(() => {
      btn.textContent = '⬇ ZIP DL';
      btn.disabled = false;
    }, 3000);
  }
}

// ページ読み込み後にボタンを挿入（SPAのナビゲーション変化にも対応）
const observer = new MutationObserver(() => {
  if (isResourcePage()) insertButton();
});
observer.observe(document.body, { childList: true, subtree: true });
if (isResourcePage()) insertButton();

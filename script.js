const SECRET_PASSWORD = "open"; // 解禁コマンド
const steps = ["STEP 1", "STEP 2", "STEP 3", "STEP 4", "STEP 5", "STEP 6", "STEP LAST"];
let unlockedCount = 0; // 現在どこまで解禁されたか
let inputBuffer = "";

// キー入力監視
document.addEventListener('keydown', (e) => {
  if (e.key === "Enter") {
    if (inputBuffer === SECRET_PASSWORD) {
      unlockNextStep();
    }
    inputBuffer = ""; // リセット
  } else if (e.key.length === 1) {
    inputBuffer += e.key;
  }
});

function unlockNextStep() {
  if (unlockedCount >= steps.length) {
    alert("すべてのステップが解禁済みです。");
    return;
  }

  const stepName = steps[unlockedCount];
  const stepId = `step-${unlockedCount}`;

  // 1. タブボタンを作成
  const tabMenu = document.getElementById('tab-menu');
  const newBtn = document.createElement('button');
  newBtn.className = 'tab-btn';
  newBtn.id = `btn-${stepId}`;
  newBtn.innerText = stepName;
  newBtn.onclick = () => showTab(stepId);
  tabMenu.appendChild(newBtn);

  // 2. コンテンツエリアを作成
  const contentArea = document.getElementById('content-area');
  const newContent = document.createElement('div');
  newContent.id = stepId;
  newContent.className = 'tab-content';

  // 中身のカスタマイズ（画像IDをずらしてダミー表示）
  newContent.innerHTML = `
        <h2>${stepName}</h2>
        <p>これは ${stepName} の秘密のコンテンツです。</p>
        <img src="https://picsum.photos/id/${unlockedCount + 10}/600/400" alt="${stepName}">
    `;
  contentArea.appendChild(newContent);

  // 3. 状態更新
  unlockedCount++;
  document.getElementById('status-msg').innerText = `現在の進行度: ${stepName}`;

  // 自動的に新しく開いたタブに切り替える
  showTab(stepId);
}

function showTab(tabId) {
  // 全非表示
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

  // 選択表示
  document.getElementById(tabId).classList.add('active');

  // ボタンのactive付け替え（IDから特定）
  const targetBtn = document.getElementById(`btn-${tabId}`) || document.getElementById('btn-intro');
  targetBtn.classList.add('active');
}
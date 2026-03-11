const SECRET_PASSWORD = "open"; // 解禁コマンド

// 画像ファイルのリスト（.png形式、ファイル名指定通り）
const IMAGE_LIST = [
  "./images/step1.png",
  "./images/step2.png",
  "./images/step3.png",
  "./images/step4.png",
  "./images/step5.png",
  "./images/steplast.png"
];

const steps = ["STEP 1", "STEP 2", "STEP 3", "STEP 4", "STEP 5", "STEP 6", "STEP LAST"];
let unlockedCount = 0;
let inputBuffer = "";

document.addEventListener('keydown', (e) => {
  if (e.key === "Enter") {
    if (inputBuffer === SECRET_PASSWORD) unlockNextStep();
    inputBuffer = "";
  } else if (e.key.length === 1) {
    inputBuffer += e.key;
  }
});

function unlockNextStep() {
  if (unlockedCount >= steps.length) return;

  const stepName = steps[unlockedCount];
  const stepId = `step-${unlockedCount}`;
  const imagePath = IMAGE_LIST[unlockedCount]; // リストから画像を取得

  // タブボタン作成
  const tabMenu = document.getElementById('tab-menu');
  const newBtn = document.createElement('button');
  newBtn.className = 'tab-btn';
  newBtn.id = `btn-${stepId}`;
  newBtn.innerText = stepName;
  newBtn.onclick = () => showTab(stepId);
  tabMenu.appendChild(newBtn);

  // コンテンツ作成（画像のみ）
  const contentArea = document.getElementById('content-area');
  const newContent = document.createElement('div');
  newContent.id = stepId;
  newContent.className = 'tab-content';
  newContent.innerHTML = `<img src="${imagePath}" alt="">`;
  contentArea.appendChild(newContent);

  unlockedCount++;
  showTab(stepId);
}

function showTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
  const targetBtn = document.getElementById(`btn-${tabId}`) || document.getElementById('btn-intro');
  targetBtn.classList.add('active');
}
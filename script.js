const SECRET_PASSWORD = "open"; // 解禁コマンド

const IMAGE_LIST = [
  "./images/step1-1.png",
  "./images/step1-2.png",
  "./images/step1-3.png",
  "./images/step1-4.png",
  "./images/step1-5.png",
  "./images/step1-6.png", // ← 追加
  "./images/step2.png",
  "./images/step3.png",
  "./images/step4.png",
  "./images/step5.png",
  "./images/step6.png",
  "./images/steplast.png"
];

const steps = [
  "STEP 1-1", "STEP 1-2", "STEP 1-3", "STEP 1-4", "STEP 1-5", "STEP 1-6",
  "STEP 2", "STEP 3", "STEP 4", "STEP 5", "STEP 6", "STEP LAST"
];

let unlockedCount = 0;
let inputBuffer = "";

// --- 以降のロジックは変更なし ---

// キー入力監視などはそのまま ---
document.addEventListener('keydown', (e) => {
  if (e.key === "Enter") {
    if (inputBuffer === SECRET_PASSWORD) {
      unlockNextStep();
    }
    inputBuffer = "";
  } else if (e.key.length === 1) {
    inputBuffer += e.key;
  }
});

function unlockNextStep() {
  if (unlockedCount >= steps.length) return;

  const stepName = steps[unlockedCount];
  const stepId = `step-${unlockedCount}`;
  const imagePath = IMAGE_LIST[unlockedCount];

  const tabMenu = document.getElementById('tab-menu');
  const newBtn = document.createElement('button');
  newBtn.className = 'tab-btn';
  newBtn.id = `btn-${stepId}`;
  newBtn.innerText = stepName;
  newBtn.onclick = () => showTab(stepId);
  tabMenu.appendChild(newBtn);

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

  const targetContent = document.getElementById(tabId);
  const targetBtn = document.getElementById(`btn-${tabId}`);

  if (targetContent) targetContent.classList.add('active');
  if (targetBtn) targetBtn.classList.add('active');
}
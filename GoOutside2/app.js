const URL = "https://teachablemachine.withgoogle.com/models/UlZM__5Sy/";

let model, webcam, maxPredictions;
let labelContainer;

const startBtn = document.getElementById("startBtn");
labelContainer = document.getElementById("label-container");

startBtn.addEventListener("click", init);

function setButtonState(isLoading) {
  startBtn.disabled = isLoading;
  startBtn.textContent = isLoading ? "Loading..." : "Start";
}

function makeLabelRows(classNames) {
  labelContainer.innerHTML = "";
  classNames.forEach((name) => {
    const row = document.createElement("div");
    row.className = "label-row";

    const left = document.createElement("div");
    left.className = "label-name";
    left.textContent = name;

    const right = document.createElement("div");
    right.className = "label-val";
    right.textContent = "0.00";

    row.appendChild(left);
    row.appendChild(right);
    labelContainer.appendChild(row);
  });
}

async function init() {
  try {
    setButtonState(true);

    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // 从 metadata 拿到 class names（更保险）
    const classNames =
      model.getClassLabels?.() ||
      Array.from({ length: maxPredictions }, (_, i) => `Class ${i + 1}`);

    // ✅ 生成固定的 label 行（比如 Tree / Fountain / Not outside）
    makeLabelRows(classNames);

    // ✅ mobile-first：canvas 尺寸由容器控制，这里给一个合理的内部分辨率
    const flip = false; // 后置摄像头不镜像
    webcam = new tmImage.Webcam(640, 640, flip);

    await webcam.setup({ facingMode: "environment" });
    await webcam.play();

    const webcamContainer = document.getElementById("webcam-container");
    webcamContainer.innerHTML = "";
    webcamContainer.appendChild(webcam.canvas);

    window.requestAnimationFrame(loop);
  } catch (err) {
    console.error(err);
    alert("Failed to start camera/model. Please check permissions or try again.");
  } finally {
    setButtonState(false);
  }
}

async function loop() {
  webcam.update();
  await predict();
  window.requestAnimationFrame(loop);
}

async function predict() {
  const prediction = await model.predict(webcam.canvas);

  // labelContainer 里每行是 .label-row，第二个子元素是数值
  const rows = labelContainer.querySelectorAll(".label-row");
  for (let i = 0; i < prediction.length && i < rows.length; i++) {
    const valEl = rows[i].querySelector(".label-val");
    valEl.textContent = prediction[i].probability.toFixed(2);
  }
}
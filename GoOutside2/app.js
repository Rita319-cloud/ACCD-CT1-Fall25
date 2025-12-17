const LABEL_MAP = {
  "Tree": "I found a tree 🌲",
  "Fountain": "I found a fountain ⛲",
  "Not outside": "Not outside"
};

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
    left.textContent = LABEL_MAP[name] || name;

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

    const classNames =
      model.getClassLabels?.() ||
      Array.from({ length: maxPredictions }, (_, i) => `Class ${i + 1}`);

    makeLabelRows(classNames);

    const flip = false;
    webcam = new tmImage.Webcam(640, 640, flip);

    await webcam.setup({ facingMode: "environment" });
    await webcam.play();

    const webcamContainer = document.getElementById("webcam-container");
    webcamContainer.innerHTML = "";
    webcamContainer.appendChild(webcam.canvas);

    // ✅ 强制 canvas 是块级（有些浏览器更稳）
    webcam.canvas.style.display = "block";

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
  const rows = labelContainer.querySelectorAll(".label-row");

  for (let i = 0; i < prediction.length && i < rows.length; i++) {
    const valEl = rows[i].querySelector(".label-val");
    valEl.textContent = prediction[i].probability.toFixed(2);
  }
}
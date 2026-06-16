let handPose;
let video;

let hands = [];
let thumbTip, indexTip;

let bubbles = [];
let pinchPrevDist = null;
let pinchThreshold = 30;
let pinchSound;

function preload() {
  handPose = ml5.handPose({ flipped: true });

  // 添加音效
  pinchSound = loadSound("sound.mp3");
}

function setup() {
  let cnv = createCanvas(640, 480);
  cnv.parent("canvas-holder");

  video = createCapture(VIDEO, { flipped: true });
  video.size(640, 480);
  video.hide();

  handPose.detectStart(video, gotHands);
}

function draw() {
  background(220);

  image(video, 0, 0, width, 480);

  // 检测捏合
  if (hands.length > 0) {
    let distNow = dist(thumbTip.x, thumbTip.y, indexTip.x, indexTip.y);

    if (pinchPrevDist !== null) {
      // 从分开 -> 捏合
      if (pinchPrevDist > pinchThreshold && distNow <= pinchThreshold) {

        // 播放音效
        if (pinchSound.isLoaded()) {
          pinchSound.play();
        }

        // 创建新的泡泡
        createNewBubbleNearFingers();
      }
    }

    pinchPrevDist = distNow;
  }

  updateBubbles();
  drawBubbles();

  if (hands.length > 0) {
    fill(0, 255, 0);
    noStroke();
    circle(thumbTip.x, thumbTip.y, 12);
    circle(indexTip.x, indexTip.y, 12);
  }
}

// 新生成的泡泡在手指附近出现
function createNewBubbleNearFingers() {
  let r = random(15, 40);

  let midX = (thumbTip.x + indexTip.x) / 2;
  let midY = (thumbTip.y + indexTip.y) / 2;

  let bubble = {
    x: midX,
    y: midY - r,
    r: r,
    vx: random(-1.5, 1.5),
    vy: random(-1, 1),
    clr: color(random(255), random(255), random(255)),
  };

  bubbles.push(bubble);
}

function updateBubbles() {
  for (let i = 0; i < bubbles.length; i++) {
    let b = bubbles[i];

    b.x += b.vx;
    b.y += b.vy;

    if (b.x - b.r < 0) {
      b.x = b.r;
      b.vx *= -1;
    }
    if (b.x + b.r > width) {
      b.x = width - b.r;
      b.vx *= -1;
    }
    if (b.y - b.r < 0) {
      b.y = b.r;
      b.vy *= -1;
    }
    if (b.y + b.r > height) {
      b.y = height - b.r;
      b.vy *= -1;
    }
  }

  // 泡泡之间不要重叠，碰到即分离
  for (let i = 0; i < bubbles.length; i++) {
    for (let j = i + 1; j < bubbles.length; j++) {
      let a = bubbles[i];
      let b = bubbles[j];

      let d = dist(a.x, a.y, b.x, b.y);
      let minDist = a.r + b.r;

      if (d < minDist) {
        let overlap = minDist - d;
        let angle = atan2(b.y - a.y, b.x - a.x);

        let moveX = cos(angle) * overlap / 2;
        let moveY = sin(angle) * overlap / 2;

        a.x -= moveX;
        a.y -= moveY;
        b.x += moveX;
        b.y += moveY;

        let tvx = a.vx;
        let tvy = a.vy;
        a.vx = b.vx;
        a.vy = b.vy;
        b.vx = tvx;
        b.vy = tvy;
      }
    }
  }
}

function drawBubbles() {
  noStroke();
  for (let b of bubbles) {
    fill(b.clr);
    circle(b.x, b.y, b.r * 2);
  }
}

function gotHands(results) {
  hands = results;
  if (hands.length > 0) {
    thumbTip = hands[0].thumb_tip;
    indexTip = hands[0].index_finger_tip;
  }
}
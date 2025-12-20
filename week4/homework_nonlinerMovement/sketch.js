let numberOfLines = 6;
let t = 0;

function setup() {
  const c = createCanvas(800, 600);
  c.parent("sketch-holder"); // canvas

  rectMode(CENTER);
  noStroke();
}

function draw() {
  background(255);

  let cellW = width / numberOfLines;
  let cellH = height / numberOfLines;

  // green card, overlay
  blendMode(MULTIPLY);

  for (let x = 0; x < width; x += cellW) {
    for (let y = 0; y < height; y += cellH) {

      let offsetX = map(
        noise(x * 0.01, y * 0.01, t),
        0, 1,
        -20, 20
      );

      let offsetY = map(
        noise(x * 0.01 + 100, y * 0.01 + 100, t),
        0, 1,
        -20, 20
      );

      fill(10, 137, 87); // green
      rect(
        x + cellW / 2 + offsetX,
        y + cellH / 2 + offsetY,
        cellW,
        cellH
      );
    }
  }

  blendMode(BLEND);

  // pink circle, normal
  for (let x = 0; x < width; x += cellW) {
    for (let y = 0; y < height; y += cellH) {

      let offsetX = map(
        noise(x * 0.01, y * 0.01, t),
        0, 1,
        -20, 20
      );

      let offsetY = map(
        noise(x * 0.01 + 100, y * 0.01 + 100, t),
        0, 1,
        -20, 20
      );

      let d = map(
        noise(x * 0.02, y * 0.02, t + 50),
        0, 1,
        10, cellW * 0.6
      );

      fill(255, 182, 201);
      circle(
        x + cellW / 2 + offsetX,
        y + cellH / 2 + offsetY,
        d
      );
    }
  }

  t += 0.01;
}
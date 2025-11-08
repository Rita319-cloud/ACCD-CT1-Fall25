// Flower Class
class Flower {
  constructor(x, y, size) {
    this.x = constrain(x, 20, width - 20);
    this.y = constrain(y, 20, height - 20);
    this.size = size || random(20, 60);

    // sakura color, random white and light pink
    if (random() < 0.5) {
      let r = random(240, 255);
      let g = random(240, 255);
      let b = random(240, 255);
      this.color = color(r, g, b);
    } else {
      let r = random(220, 255);
      let g = random(150, 200);
      let b = random(180, 220);
      this.color = color(r, g, b);
    }

    this.growthRate = 0.3;
    this.maxSize = 120;
  }

  show() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.size);
  }

  grow() {
    if (this.size < this.maxSize) {
      this.size += this.growthRate;
    }
  }
}

// Bee Class
class Bee {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = random(1.5, 2.5);
    this.angle = random(TWO_PI);
    this.turnChance = 0.05;
  }

  move() {
    if (random(1) < this.turnChance) {
      this.angle += random(-PI / 4, PI / 4);
    }

    this.x += cos(this.angle) * this.speed;
    this.y += sin(this.angle) * this.speed;

    let margin = 40;
    if (this.x < margin || this.x > width - margin || this.y < margin || this.y > height - margin) {
      let centerAngle = atan2(height / 2 - this.y, width / 2 - this.x);
      this.angle = lerpAngle(this.angle, centerAngle, 0.1);
    }

    this.x = constrain(this.x, 5, width - 5);
    this.y = constrain(this.y, 5, height - 5);
  }

  show() {
    push();
    translate(this.x, this.y);
    fill(255, 215, 0);
    noStroke();
    rotate(this.angle);
    triangle(-5, -6, -5, 6, 8, 0);
    pop();
  }
}

// 辅助函数：角度插值
function lerpAngle(a, b, t) {
  let diff = ((b - a + PI) % TWO_PI) - PI;
  return a + diff * t;
}
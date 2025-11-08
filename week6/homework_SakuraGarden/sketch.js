let flowers = []
let bees = []
let sizeSlider

function setup() {
  let canvas = createCanvas(800, 600)
  canvas.parent("canvas-wrapper") // canvas 放进 div

  sizeSlider = select('#sizeSlider')

  // 🌸🌸🌸
  for (let i = 0; i < 5; i++) {
    flowers.push(new Flower(random(50, width - 50), random(100, height - 50)))
  }

  // 🐝🐝🐝
  for (let i = 0; i < 10; i++) {
    bees.push(new Bee(random(width), random(height)))
  }
}

function draw() {
  background(0, 0, 0)

  // sakura
  for (let f of flowers) {
    f.show()
  }

  // bee fly through sakura, sakura grow bigger
  for (let b of bees) {
    b.move()
    b.show()

    for (let f of flowers) {
      let d = dist(b.x, b.y, f.x, f.y)
      if (d < f.size / 2 - 5) {
        f.grow()
      }
    }
  }
}

// add sakura
function mousePressed() {
  if (mouseY < 0 || mouseY > height || mouseX < 0 || mouseX > width) return
  let newSize = sizeSlider.value()
  flowers.push(new Flower(mouseX, mouseY, newSize))
}
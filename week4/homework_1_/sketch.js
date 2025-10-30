let posX
let posY

let velX
let velY

let radius = 20

let noiseOffsetX = 0
let noiseOffsetY = 100

let img
let bounceSound

function preload() {
  img = loadImage("face.png")
  bounceSound = loadSound("bounce.mp3")
}

function setup() {
  createCanvas(600, 600)
  colorMode(HSB, width, 100, 100)
  noStroke()

  posX = width * 0.5
  posY = height * 0.5

  velX = random(-2, 2)
  velY = random(-2, 2)
}

function draw() {
  background(0, 0, 85)
  let noiseVX = map(noise(noiseOffsetX), 0, 1, -2, 2)
  let noiseVY = map(noise(noiseOffsetY), 0, 1, -2, 2)

  posX += velX + noiseVX
  posY += velY + noiseVY

  noiseOffsetX += 0.01
  noiseOffsetY += 0.01

  console.log(bounceSound.isPlaying())

  if (posY + radius * 1.5 >= height || posY - radius * 1.5<= 0) {
    velY *= -1
    
    if (bounceSound.isLoaded() && !bounceSound.isPlaying()) {
      console.log("play sound")
      bounceSound.play()
    }
  }
  // else {
  //   bounceSound.stop()
  // }
  if (posX + radius * 1.5 >= width || posX - radius * 1.5 <= 0) {
    velX *= -1
    if (bounceSound.isLoaded() && !bounceSound.isPlaying()) {
      console.log("play sound")
      bounceSound.play()
    }
  }

  if (img) {
    imageMode(CENTER)
    image(img, posX, posY, radius * 3, radius * 3)

    strokeWeight(2)
    noFill()
    rectMode(CENTER)
    rect(posX, posY, radius * 3, radius * 3)
  } 
  // else {
  //   fill(posX, 100, 100)
  //   circle(posX, posY, radius * 2)
  // }

  stroke(255, 0, 0)
  strokeWeight(18)
  fill(width * 0.75, 100, 100)
  rect(width * 0.5 - 50, height * 0.5 - 50, 100, 100)
}


function mousePressed() {
  userStartAudio();
}

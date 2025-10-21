let diameter = 90

function setup() {
  createCanvas(800, 600)
  colorMode(HSB, width, 100, 100, 100)
  
  let blendModes = [
    BLEND, 
    DARKEST, 
    LIGHTEST, 
    DIFFERENCE, 
    MULTIPLY, 
    EXCLUSION, 
    SCREEN, 
    REPLACE, 
    OVERLAY, 
    HARD_LIGHT, 
    SOFT_LIGHT, 
    DODGE, 
    BURN, 
    ADD, 
    REMOVE,
    SUBTRACT
  ]
  blendMode(blendModes[6])

  background(0, 0, 0)
  noStroke()
  
  let numColumns = floor(width/diameter)
  console.log("Number of columns:" + numColumns)
  let circleHDist = width/numColumns
  console.log("Horizontal distance between circles:" + circleHDist)
  
  for(let x = 0; x < numColumns; x++){
    let circlePosX = x*circleHDist+(circleHDist*0.5)
    
    let numRows = floor(height/diameter)
    console.log("Number of rows: " + numRows)
    let circleVDist = height/numRows
    console.log("Vertical distance between circles: " + circleVDist)
    for(let y = 0; y < numRows; y++){
      let circlePosY = y*circleVDist+(circleVDist*0.5) 
      
      fill(circlePosX, 80, 80, 30)
      circle(circlePosX, circlePosY, 150)
    }
  }
}
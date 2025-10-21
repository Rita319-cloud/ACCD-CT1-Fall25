let numberOfLines = 6

function setup() {
  createCanvas(800, 600);
  background(200);
  
  let colNumber = 0
  for(let x = 0; x <= width; x = x + width/numberOfLines)
  {
    for(let y = 0; y <= height; y = y + height/numberOfLines)
   {
     let nextX = x + width/numberOfLines
     let nextY = y + height/numberOfLines
     // console.log("Next X:"+nextX)
     // console.log("Next Y:"+nextY)
     line(x, y, nextX, y)
     line(x, y, x, nextY)
     
     fill(random(255), 120, 160 )
     rect(x, y, width/numberOfLines,height/numberOfLines)
     
     fill(120, random(0, 255), 220)
     rect(x+10, y+15, 40, 30)
     
     fill(160, random(0, 255), 220)
     triangle(random(x, nextX), random(y, nextY), random(x, nextX),random(y, nextY),random(x, nextX), random(y, nextY))
     
     fill(255, random(0, 255), 220)
     circle(x+(width/numberOfLines)/2, y+(height/numberOfLines)/2, colNumber*10)
   }
   colNumber++
   console.log(colNumber)
  }
  
   
  
  // fill(120, random(0, 255), 220)
  // rect(100, 100, 400, 300)
  
  // fill(160, random(0, 255), 220)
  // triangle(random(width), random(height), random(width),random(height),random(width), random(height))
  
  // fill(255, random(0, 255), 220)
  // circle(width/2, height/2,100)
  
}
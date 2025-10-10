let cBox = document.getElementById("colorBox");
let colorBtn = document.getElementById("ChangeColor");
let imgBox = document.getElementById("shellImage")
let imageBtn = document.getElementById("toggleImage")

let assignRandomColor = function()
{
    let rComp=255*Math.random()
    let gComp=255*Math.random()
    let bComp=255*Math.random()
    cBox.style.backgroundColor = "rgb(" + rComp + "," + gComp + "," + bComp + ")"
}

const toggleShellImage = () =>
{
    console.log("imgBox.src")
    if(imgBox.src.includes("shell1.jpg"))
    {
        imgBox.src="assets/shell2.jpg"
    }
    else
    {
        imgBox.src="assets/shell1.jpg"
    }
}

imageBtn.addEventListener("click", toggleShellImage)
colorBtn.addEventListener("click", assignRandomColor)
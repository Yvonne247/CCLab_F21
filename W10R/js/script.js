console.log("Loaded!");

let bgR = 100;
let bgG = 100;
let bgB = 100;

let sliderBgR;

function setup() {
  createCanvas(400, 500);
  sliderBgR = document.getElementById('bg-r')
  sliderBgG = document.getElementById('bg-g')
  sliderBgB = document.getElementById('bg-b')
}

function draw() {
  // background(bgR, bgG, bB);
  let r = sliderBgR.value;
  let g = sliderBgG.value;
  let b = sliderBgB.value;
  background(r, g, b);
}


function drawCircle() {
  let x = random(width);
  let y = random(height);
  let dia = random(100, 200);
  fill(255);
  ellipse(x, y, dia, dia);
}




/*
for (let i = 0; i < 10; i ++) {
let newBtn = document.createElement('button');
newBtn.style.width = "50px";
newBtn.style.height = "50px";
newBtn.style.margin = "10px";

newBtn.addEventListener("click",change);
document.body.appendChild(newBtn);
}

function change() {
  let body = document.body;
  let r = Math.random() * 255;
  let g = Math.random() * 255;
  let b = Math.random() * 255;
  body.style.backgroundColor = "rgb(" + r + ", " + g + ", " + b + ")";
}
*/

// for (let i = 0; i < 10; i ++) {
//   let newDiv = document.createElement('div');
//
//   newDiv.style.backgroundColor = "gray";
//   newDiv.style.float = "left";  newDiv.style.width = "100px";
//   newDiv.style.height = "100px";
//   newDiv.style.margin = "10px";
//
//   document.body.appendChild(newDiv)
// }

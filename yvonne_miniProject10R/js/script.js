let currX = 0;
let currY = 0;
let prevX;
let prevY;
// let dia = 20;
let w = 5;
let going = false;
let start = true;

let sliderRp, sliderGp, sliderBp;
// let sliderRb, sliderGb, sliderBb;
let radioCir, radioRec, radioLine;
let sliderWeight;

function setup() {
  let canvas = createCanvas(600, 500);
  canvas.id("p5-canvas");
  background(225,200,225);
  sliderRp = document.getElementById("pgr");
  sliderGp = document.getElementById("pgg");
  sliderBp = document.getElementById("pgb");
/*
  sliderRb = document.getElementById("bgr");
  sliderGb = document.getElementById("bgg");
  sliderBb = document.getElementById("bgb");
*/
  radioCir = document.getElementById("radio-circle");
  radioRec = document.getElementById("radio-rectangle");
  radioLine = document.getElementById("radio-line");

  sliderWeight = document.getElementById("sw");

  //T-shirt
  fill(255);
  noStroke();
  beginShape();
  vertex(150, 50);
  vertex(100, 200);
  vertex(150, 210);
  vertex(150, 435);
  vertex(450, 435);
  vertex(450, 210);
  vertex(500, 200);
  vertex(450, 50);
  endShape();
  fill(225,200,225);
  ellipse(width / 2, 50, 200, 70);
}

function draw() {
  if (going) {
    currX = mouseX;
    currY = mouseY;

    let pgR = sliderRp.value;
    let pgG = sliderGp.value;
    let pgB = sliderBp.value;
    let w = sliderWeight.value;

    //change shapes
    // if (key == ",") {
    //   start = true;
    // } else if (key == ".") {
    //   start = false;
    // }

    if (start) {
    //   stroke(pgR, pgG, pgB);
    //   strokeWeight(w);
    //   line(prevX, prevY, currX, currY);
    // } else {
      if (mouseIsPressed) {
        if (radioCir.checked) {
          noStroke();
          fill(pgR, pgG, pgB);
          ellipse(mouseX, mouseY, 20, 20);
        } else if (radioRec.checked) {
          noStroke();
          fill(pgR, pgG, pgB);
          rectMode(CENTER);
          rect(mouseX, mouseY, 20, 20);
        } else if (radioLine.checked) {
          stroke(pgR, pgG, pgB);
          strokeWeight(w);
          line(prevX, prevY, currX, currY);
        }
      }
    }

    //change thickness of the line
    if (key == "+") {
      w += 1;
    } else if (key == "-") {
      w -= 0.2;
    }
    prevX = currX;
    prevY = currY;
  }
}

function mousePressed() {
  going = true;
}

/*
function addDiv() {
  //create a HTML
  let newElt = document.createElement("div");
  //change properties
  newElt.style.backgroundColor = "gray";
  newElt.style.width = "50px";
  newElt.style.height = "50px";
  newElt.style.margin = "30px";
  //attach the elt to the document
  document.getElementById("box").appendChild( newElt )
}
*/

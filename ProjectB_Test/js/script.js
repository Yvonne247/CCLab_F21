// let dia;
let BlackHole;
let stars = [];
let texts = [];
let img;
let music;

function preload() {
  music = loadSound("assets/music.mp3");
};

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('myContainer');
  canvas.mousePressed(userStartAudio);
  img = createImage(width, height);
  BlackHole = new BHnormal();
  textInput = document.getElementById("text-input");
}

function draw() {
  background(0, 10);

//   img.loadPixels();
//   for (let y = 0; y < img.height; y++) {
//     for (let x = 0; x < img.width; x++) {
//       let index = (x + y * img.width) * 4;
//
//       let r = map(x, 0, img.width, 0, 100);
//       let g = 0;
//       let b = map(y, img.height, 0, 10, 150);
//
//       img.pixels[index + 0] = r; // R
//       img.pixels[index + 1] = g; // G
//       img.pixels[index + 2] = b; // B
//       img.pixels[index + 3] = 255; // A
//     }
// }
// img.updatePixels();
//
// image(img, 0, 0);

  // starry night
  if (random() < 0.50) {
    stars.push(new Star(random(width), random(height), random(0, 4)));
  }

  for (let i = 0; i < stars.length; i++) {
    let s = stars[i];
    s.move();
    s.checkBottom();
    s.display();
  }

  // limit
  while (stars.length > 40) {
    stars.splice(0, 1);
  }

  // remove based on certain conditions
  for (let i = stars.length-1; i >= 0; i--) {
    let s = stars[i];
    if (s.isDone == true) {
      stars.splice(i, 1);
    }
  }

  // display the number of the objects
  push();
  fill(0, 255, 0);
  noStroke();
  text(stars.length, 10, 20);
  pop();

  // text input
  push();
  for (let n = 0; n < texts.length; n++) {
    let t = texts[n];
    // t.move();
    t.display();
  }
  pop();

  BlackHole.display();

}

class Star {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.xSpd = 0;
    this.ySpd = random(0.05, 0.1);
    this.rad = r;

    this.rOri = 255;
    this.gOri = 255;
    this.bOri = 255; // white

    this.r = this.rOri;
    this.g = this.gOri;
    this.b = this.bOri;
    this.a = random(100, 150);


    this.isDone = false;
  }
  move() {
    this.x -= this.xSpd;
    this.y -= this.ySpd;
  }

  checkBottom() {
    if (this.y > height) {
      this.isDone = true;
    }
  }
  display() {
    push();
    fill(this.r, this.g, this.b);
    noStroke();
    circle(this.x, this.y, this.rad * 2);
    pop();
  }
}


function addText() {
  if (textInput.value != "") {
    texts.push(new FloatingText(textInput.value));
    textInput.value = "";
  }
}

class FloatingText {
  constructor(txt) {
    this.x2 = random(windowWidth);
    this.y2 = random(windowHeight);
    this.txt = txt;
    this.alpha = random(0, 220);
    this.size2 = random(10, 50);
    // this.xSpd2 = random(0.5, 1.2);
    // this.ySpd2 = 0;
  }
  // move() {
  //   this.x2 += this.xSpd2;
  //   this.y2 += this.ySpd2;
  // }
  display() {
    push();
    noStroke();
    fill(255, this.alpha);
    textSize(this.size2);
    text(this.txt, this.x2, this.y2);
    pop();
  }
}


class BHnormal {
  constructor() {
    this.amp = 1;
  }
  display() {
    push();
    let freq = frameCount * 0.02; // time
    let sinValue = sin(freq) * this.amp;

    let x1 = width / 2;
    let y1 = height / 2 + sinValue;
    let rad1 = 100;

    let black = map(sinValue, -1, 1, 0, 10);
    let dia1 = map(sinValue, -1, 1, 210, 250);
    stroke(255);
    strokeWeight(3);
    fill(black);

    if (key = "a" && dia1 < windowWidth/2) {
      let dia1 += 3;
      circle(x1, y1, dia1);
    } else {
      circle(x1, y1, dia1);
    }
    pop();
    console.log(rad1);
    }
}

function mousePressed() {
    music.play();
}

// class BHswallow() {
//     constructor(){
//
//     }
//     display(){
//
//     }
// }

let bh;
let stars = [];
let texts = [];
let img;
let music;

function checkMousePosition() {
  //console.log(event.clientY);
  let box = document.getElementById('top-box');
  if (event.clientY < 200) {
    box.style.display = "block";
  } else {
    box.style.display = "none";
  }
}

function preload() {
  music = loadSound("assets/music.mp3");
};

function mousePressed() {
  music.play();
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('myContainer');
  //canvas.mousePressed(userStartAudio);
  img = createImage(width, height);
  bh = new BlackHole(width/2, height/2);
  textInput = document.getElementById("text-input");
}

function draw() {
  background(0, 10);

// pixel background
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
    // remove based on certain conditions
    if (s.isDone == true) {
      stars.splice(i, 1);
    }
  }

  // limit
  while (stars.length > 40) {
    stars.splice(0, 1);
  }

  // text input
  // push();
  for (let n = 0; n < texts.length; n++) {
    let t = texts[n];
    if(texts[n].start==true){
      t.attractedTo(bh);
    }
    t.display();
  }
  // pop();

  bh.display();

}

function addText() {
  if (textInput.value != "") {
    texts.push(new FloatingText(textInput.value));
    textInput.value = "";
  }
}

function textMove(){
  console.log('function textMove() works!')
  for(let i = 0;i < texts.length; i++){
    texts[i].start=true;
  }
}

class FloatingText {
  constructor(txt) {
    this.x2 = random(50, windowWidth - 300);
    this.y2 = random(50, windowHeight - 300);
    this.txt = txt;
    this.alpha = random(0, 220);
    this.size2 = random(20, 50);
    this.start=false;
    this.isDOne = false;
    //remove the text
  }

  attractedTo(target) {
    let adj = 0.01;
    let velX = (target.x - this.x) * adj;
    let velY = (target.y - this.y) * adj;

    this.x += velX;
    this.y += velY;

    let distance = dist(this.x, this.y, target.x, target.y);
    if (distance < target.rad - 10) {
      this.isDone = true
    }
    this.scl = map(distance, 0, 300, 0, 1.0);
  }

  display() {
    let freq1 = frameCount * 0.01; // time
    // let amp1 = 100;
    let sinValue1= sin(freq1) * 0.05
    this.x += sinValue1;
    this.y += sinValue1;

    push();
    translate(this.x, this.y);
    scale(this.scl);
    noStroke();
    fill(255, this.alpha);
    textSize(this.size);
    textAlign(CENTER);
    text(this.txt, 0, 0);
    pop();
  }
}


class Star {
  constructor(x, y, r) {
    this.start = false;
    this.x = x;
    this.y = y;
    this.xSpd = 0;
    this.ySpd = 0; //random(0.05, 0.1);
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

class BlackHole {
  constructor() {
    this.x = x;
    this.y = y;
    this.rad = 120;
  }
  display() {
    push();
    let freq = frameCount * 0.02; // time
    let sinValue = sin(freq);
    this.rad = map(sinValue, -1, 1, 100, 150);

    fill(0);
    circle(this.x, this.y, this.rad * 2);

    blendMode(ADD);
    stroke(120, 35, 5);
    strokeWeight(5);
    noFill();
    circle(this.x, this.y, this.rad * 2);
    pop();
  }
}

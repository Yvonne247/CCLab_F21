let bh;
let stars = [];
let texts = [];
let img;
let music;

function checkMousePosition() {
  //console.log(event.clientY);
  let box = document.getElementById('top-box');
  if (event.clientY < 50) {
    box.style.display = "block";
  } else {
    box.style.display = "none";
  }
}
function preload() {
  music = loadSound("assets/music.mp3");
};

function mousePressed() {
  music.playMode("untilDone");
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

  // starry night
  // generate the stars
  if (random() < 0.50) {
    stars.push(new Star(random(width), random(height), random(0, 4)));
  }
  // update and display the stars
  for (let i = stars.length-1; i >= 0; i--) {
    let s = stars[i];
    s.move();
    s.checkBottom();
    s.display();
    // remove
    if (s.isDone == true) {
      stars.splice(i, 1);
    }
  }
  // limit
  while (stars.length > 40) {
    stars.splice(0, 1);
  }

  // text input
  for (let n = 0; n < texts.length; n++) {
    let t = texts[n];
    if(t.start == true){
      t.attractedTo(bh);
      push();
      fill(255);
      textSize(40);
      text("Everything will be alright", bh.x - 230, bh.y - 180)
      pop();
    }

    // remove
    if (t.isDone == true) {
      texts.splice(0, 1);
    }
    t.display();
  }
  console.log(texts.length);
  bh.display();

  //modal box textInput
  //Reference: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal_bottom
  // Get the modal
  let modal = document.getElementById("myModal");
  // Get the button that opens the modal
  let btn = document.getElementById("typeIn");
  // Get the <span> element that closes the modal
  let span = document.getElementsByClassName("close")[0];
  // When the user clicks the button, open the modal
  btn.onclick = function() {
    modal.style.display = "block";
  }
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }


}

function addText() {
  if (textInput.value != "") {
    texts.push(new FloatingText(textInput.value, bh));
    textInput.value = "";
  }
}

function textMove(){
  console.log('function textMove() works!')
  for(let i = 0; i < texts.length; i++){
    texts[i].start = true;
  }
}

class FloatingText {
  constructor(txt, target) {

    push()
    translate(target.x, target.y);
    this.x = random(260, windowWidth - 300);
    this.y = random(260, windowHeight - 300);
    // this.locx = random(50, windowWidth-50);
    // this.locy = random(50, windowHeight-50);
    // this.dis = dist(this.locx, this.locy, target.x, target.y);
    //
    // if (this.dis > 300) {
    //   this.x = this.locx;
    //   this.y = this.locy;
    // } else {}
    // this.x = random(windowWidth);
    // this.y = random(, windowHeight);
    this.txt = txt;
    this.alpha = random(0, 220);
    this.size = random(20, 50);
    this.scl = 1.0;
    this.start=false;
    this.isDone = false;
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
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.rad = 120;
  }
  display() {
    push();
    let freq = frameCount * 0.02; // time
    let sinValue = sin(freq);
    this.rad = map(sinValue, -1, 1, 80, 130);

    fill(0);
    circle(this.x, this.y, this.rad * 2);

    blendMode(ADD);
    stroke(70, 20, 5);
    strokeWeight(8);
    noFill();
    circle(this.x, this.y, this.rad * 2);
    pop();
  }
}

let img;
let circleImg;

function preload() {
  img = loadImage("image/album_image.jpeg");
  circleImg = loadImage("image/sprite.png");
}

function setup() {
  createCanvas(400, 500);
  background(220);
}

function keyPressed() {
  
}

function draw() {
  // background(220);
  push();
  let dia = map(sin(frameCount)*0.03, 01, 1, 50, 100);
  imageMode(CENTER);
  image(circleImg, mouseX, mouseY, dia, dia);
  tint(255, 100);
  // filter(BLUR, 6);
  // filter(GRAY);
  // filter(INVERT);
  filter(THRESHOLD, 0.8);
  pop();
  // image(img, 0, 0); //(img, x, y, (w), (h))
}

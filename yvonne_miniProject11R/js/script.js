let img;
let cam;

function setup() {
  createCanvas( 640, 480 );

  cam = createCapture(VIDEO);
  //cam.hide();
  img = createImage(width, height);
}

function draw() {
  background(150);

  cam.loadPixels();
  img.loadPixels();

  let gridSize = 21;
  noStroke();
  for (let y = 0; y < img.height; y += gridSize) {
    for (let x = 0; x < img.width; x += gridSize) {

      let index = (x + y*img.width) * 4;
      let distance = dist(mouseX, mouseY, x, y);
      let r = cam.pixels[index + 0] + map(distance, 0, img.width / 2, 0, 255);
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2] + map(distance, 0, img.height / 2, 0, 255);


      let avg = (r + g + b) / 3;

      let size = map(avg, 0, 255, 5, gridSize);

      fill(r, g, b);
      ellipse(x, y, size, size);
    }
  }
  cam.updatePixels();
  img.updatePixels();
}

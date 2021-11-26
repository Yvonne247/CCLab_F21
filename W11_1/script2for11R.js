
let img;
let cam;

function setup() {
  createCanvas( 640, 480 );

  cam = createCapture(VIDEO);
  //cam.hide();
  img = createImage(width, height);
}

function draw() {
  background(0);

  cam.loadPixels();
  img.loadPixels();
  let gridSize = 10;
  noStroke();
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let index = (x + y * img.width) * 4;

      let r = cam.pixels[index + 0];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];

      let avg = (r + g + b) / 3;
      let threshold = 0.65;
      let size = map(avg, 0, 255, 1, gridSize);
      if (avg > 255 * threshold) {
        // purple
        img.pixels[index + 0] = 200;
        img.pixels[index + 1] = 0;
        img.pixels[index + 2] = 255;
        img.pixels[index + 3] = 255;
      } else {
        // yellow
        img.pixels[index + 0] = 255;
        img.pixels[index + 1] = 255;
        img.pixels[index + 2] = 0;
        img.pixels[index + 3] = 255;
      }
    }
}
  img.updatePixels();
  image(img, 0, 0);
}

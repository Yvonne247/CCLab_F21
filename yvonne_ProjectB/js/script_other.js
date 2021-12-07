let music;

function preload() {
  music = loadSound("assets/music.mp3");
};

function mousePressed() {
  music.playMode("untilDone");
  music.play();
}

let game;
let bgImg, astroImg, alienImg, rockImg;
let baseURL = "http://localhost:5500";

// p5js preload
function preload() {
  bgImg = loadImage(`${baseURL}/assets/bg.png`);
  astroImg = loadImage(`${baseURL}/assets/astro.png`);
  alienImg = loadImage(`${baseURL}/assets/alien.png`);
  rockImg = loadImage(`${baseURL}/assets/rock.png`);
};

// p5js setup
function setup() {
  game = new Game(bgImg, astroImg, alienImg, rockImg, 60);
  rectMode(CENTER);
  strokeWeight(2);
  frameRate(game.fps);
};

function draw() {
  game.draw();
}

// user facing
const loadLVL = (lvl) => game.loadLVL(lvl);
const reset = () => game.resetPlayer();
const moveUp = () => game.cmdQueue.push("u");
const moveDown = () => game.cmdQueue.push("d");
const moveLeft = () => game.cmdQueue.push("l");
const moveRight = () => game.cmdQueue.push("r");
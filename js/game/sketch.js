let game;
let bgImg, astroImg, alienImg, rockImg;
let baseURL = "https://andymina.github.io";

// p5js preload
function preload() {
  bgImg = loadImage(`${baseURL}/assets/game/bg.png`);
  astroImg = loadImage(`${baseURL}/assets/game/astro.png`);
  alienImg = loadImage(`${baseURL}/assets/game/alien.png`);
  rockImg = loadImage(`${baseURL}/assets/game/rock.png`);
};

// p5js setup
function setup() {
  game = new Game(bgImg, astroImg, alienImg, rockImg, 60);
  rectMode(CENTER);
  strokeWeight(2);
  frameRate(game.fps);
  noLoop(); // draw once and stop
};

function draw() {
  game.draw();
}

// user facing
const loadLVL = (lvl) => { game.loadLVL(lvl); redraw(); }
const reset = () => { game.resetPlayer(); redraw(); };
const moveUp = () => game.cmdQueue.push("u");
const moveDown = () => game.cmdQueue.push("d");
const moveLeft = () => game.cmdQueue.push("l");
const moveRight = () => game.cmdQueue.push("r");
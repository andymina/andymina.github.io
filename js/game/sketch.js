let bgImg, astroImg, alienImg, rockImg;

function preload() {
  bgImg = loadImage("http://localhost:5500/assets/bg.png");
  astroImg = loadImage("http://localhost:5500/assets/astro.png");
  alienImg = loadImage("http://localhost:5500/assets/alien.png");
  rockImg = loadImage("http://localhost:5500/assets/rock.png")
}

// p5js setup
function setup() {
  game = new Game(bgImg, astroImg, alienImg, 60);
  rectMode(CENTER);
  strokeWeight(2);
  frameRate(game.fps);
}

// p5js draw
function draw() {
  game.draw();
};

const moveUp = () => game.cmdQueue.push("u");
const moveDown = () => game.cmdQueue.push("d");
const moveLeft = () => game.cmdQueue.push("l");
const moveRight = () => game.cmdQueue.push("r");
const reset = () => game.player.x = game.player.y = 60;
class Game {
  constructor(bgImg, astroImg, alienImg, fps) {
    this.canvas = createCanvas(600, 600).parent("sketch-container");
    this.fps = fps;
    this.frame = 0;
    this.cmdQueue = [];
    this.bgImg = bgImg;

    this.player = new Astro(astroImg);
    this.rock = new Sprite(rockImg);
    this.alien = new Sprite(alienImg);
    this.alien.x += this.alien.step;
    this.rock.x += this.rock.step * 2;    
  }

  processCmd(char) {
    switch (char) {
      case "u":
        this.player.moveUp();
        break;
      case "d":
        this.player.moveDown();
        break;
      case "l":
        this.player.moveLeft();
        break;
      case "r":
        this.player.moveRight();
        break;
    }
  }

  drawGrid() {
    for (let i = 0; i < 5; i++) {
      line(120 * i, 0, 120 * i, this.canvas.height);
      line(0, 120 * i, this.canvas.width, 120 * i);
    }
  }

  draw() {
    background(this.bgImg);
    this.drawGrid();

    // process cmdQueue
    if (this.frame % this.fps === 0 && this.cmdQueue.length > 0) {
      this.frame = 0;
      let cmd = this.cmdQueue.shift();
      this.processCmd(cmd);
    }

    this.player.draw();
    this.rock.draw();
    this.alien.draw();
    this.frame++;
  }
}

class Sprite {
  constructor(img) {
    this.x = this.y = 60;
    this.xLeftLim = this.yTopLim = 60;
    this.xRightLim = this.yBottomLim = 540;
    this.step = 120;
    this.sprite = img;
  }

  draw() {
    imageMode(CENTER);
    image(this.sprite, this.x, this.y, this.sprite.width, this.sprite.height);
    imageMode(CORNER);
  }
}

class Astro extends Sprite {
  constructor(astroImg) {
    super(astroImg);
  }

  moveUp() {
    if (this.y !== this.yTopLim)
      this.y -= this.step;
  }

  moveDown() {
    if (this.y !== this.yBottomLim)
      this.y += this.step;
  }

  moveLeft() {
    if (this.x !== this.xLeftLim)
      this.x -= this.step;
  }

  moveRight() {
    if (this.x !== this.xRightLim)
      this.x += this.step;
  }
}
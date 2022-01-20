class Game {
  constructor(bgImg, astroImg, alienImg, rockImg, fps) {
    // p5 stuff
    this.frame = 0;
    this.fps = fps;
    this.canvas = createCanvas(600, 600).parent("sketch-container");
    this.bgImg = bgImg;

    // game setup   
    this.baseURL = "http://localhost:5500";  
    this.astroImg = astroImg;
    this.alienImg = alienImg;
    this.rockImg = rockImg;

    // game logic
    this.player = new Astro(astroImg);
    this.cmdQueue = [];
    this.drawables = [];
    this.lvls = [
      ['AXXXX', 'XXXXX', 'XXXXX', 'XXXXX', 'XXXXE'],
      ['ARXXX', 'XRXRX', 'XRXXX', 'XRXRX', 'XXXRE'],      
      ['ARXEX', 'XXRXX', 'XXXRX', 'XXXXX', 'XXXXX'],
      ['XXXXX', 'XXXXX', 'XRARX', 'XXRXX', 'XXEXX'],
    ];
    this.loadLVL(0); // load sandbox
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

  resetPlayer() {
    this.player.reset()
  }

  loadLVL(num) {
    // reset drawables and grab lvl
    this.drawables = [];
    let lvl = this.lvls[num];

    for (let row = 0; row < lvl.length; row++) {
      for (let col = 0; col < lvl[row].length; col++) {
        if (lvl[row][col] === "A")
          this.player = new Astro(this.astroImg, col, row);
        else if (lvl[row][col] === "R")
          this.drawables.push(new Sprite(this.rockImg, col, row));
        else if (lvl[row][col] === "E")
          this.drawables.push(new Sprite(this.alienImg, col, row));
      }
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

    // process cmdQueue
    if (this.frame % this.fps === 0 && this.cmdQueue.length > 0) {
      this.frame = 0;
      let cmd = this.cmdQueue.shift();
      this.processCmd(cmd);
    }

    // draw phase
    this.drawGrid();
    this.player.draw();
    for (let item of this.drawables)
      item.draw();

    this.frame++;
  }
}
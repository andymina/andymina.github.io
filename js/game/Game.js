class Game {
  constructor(bgImg, astroImg, alienImg, rockImg, fps) {
    // p5 stuff
    this.frame = 0;
    this.fps = fps;
    this.canvas = createCanvas(600, 600).parent("sketch-container");
    this.bgImg = bgImg;

    // game setup 
    this.astroImg = astroImg;
    this.alienImg = alienImg;
    this.rockImg = rockImg;

    // game logic
    this.player = new Sprite(astroImg);
    this.cmdQueue = [];
    this.drawables = [];
    this.currentLVL = 0;
    this.currentGoals = [];
    this.lvls = [
      ['AXXXX', 'XXXXX', 'XXXXX', 'XXXXX', 'XXXXE'],
      ['ARXXX', 'XRXRX', 'XRXXX', 'XRXRX', 'XXXRE'],      
      ['ARXEX', 'XXRXX', 'XXXRX', 'XXXXX', 'XXXXX'],
      ['XXXXX', 'XXXXX', 'XRARX', 'XXRXX', 'XXEXX'],
    ];
    this.goals = [
      ["43", "34"],
      ["43"],
      ["40", "31"],
      ["14", "34"],
    ]
    this.loadLVL(0); // load sandbox
  }

  // true for disabled, false for enabled
  disableButtons(state) {
    $("#run-btn").prop("disabled", state);
    $("#reset-btn").prop("disabled", state);
    $("#lvl0-btn").prop("disabled", state);
    $("#lvl1-btn").prop("disabled", state);
    $("#lvl2-btn").prop("disabled", state);
    $("#lvl3-btn").prop("disabled", state);
  }

  processCmd(char) {
    let space = "";
    if (char === "u") {
      space = this.currentLVL[this.player.y - 1][this.player.x]
      if (space === "A" || space === "X")
        this.player.y -= 1;
    } else if (char === "d") {
      space = this.currentLVL[this.player.y + 1][this.player.x]
      if (space === "A" || space === "X")
        this.player.y += 1;
    } else if (char === "l") {
      space = this.currentLVL[this.player.y][this.player.x - 1]
      if (space === "A" || space === "X")
        this.player.x -= 1;
    } else if (char === "r") {
      space = this.currentLVL[this.player.y][this.player.x + 1]
      if (space === "A" || space === "X")
        this.player.x += 1;
    }
  }

  resetPlayer() {
    this.player.reset()
  }

  loadLVL(num) {
    // reset drawables and grab lvl
    this.drawables = [];
    this.currentLVL = this.lvls[num];
    this.currentGoals = this.goals[num];

    for (let row = 0; row < this.currentLVL.length; row++) {
      for (let col = 0; col < this.currentLVL[row].length; col++) {
        if (this.currentLVL[row][col] === "A")
          this.player = new Sprite(this.astroImg, col, row);
        else if (this.currentLVL[row][col] === "R")
          this.drawables.push(new Sprite(this.rockImg, col, row));
        else if (this.currentLVL[row][col] === "E")
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

    // draw phase
    this.drawGrid();
    this.player.draw();
    for (let item of this.drawables)
      item.draw();

    // check for win
    for (let i = 0; i < this.currentGoals.length; i++) {
      if (
        this.player.x === parseInt(this.currentGoals[i][0]) &&
        this.player.y === parseInt(this.currentGoals[i][1])
      ) {
        console.log("You win!");
        break;
      }
    }

    if (this.cmdQueue.length === 0) {
      this.disableButtons(false); // enable btns if no cmds
      noLoop();                   // stop drawing      
    }      
    
    // process cmdQueue
    if (this.frame == (this.fps / 1.5)) {
      this.frame = 0;
      let cmd = this.cmdQueue.shift();
      this.processCmd(cmd);
    }

    this.frame++;
  }
}
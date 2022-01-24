class Game {
  constructor(bgImg, astroImg, alienImg, rockImg, fps) {
    // p5 stuff
    this.frame = 0;
    this.fps = fps;
    this.bgImg = bgImg;

    // canvas stuff
    /**
     * canvas needs to be a square. get the size of
     * col-6 and set it equal to that
     */
    this.parent = `${window.innerWidth < 992 ? "md-" : ""}sketch-container`;
    this.canvas = createCanvas(
      $("#size-hack").width(),
      $("#size-hack").width()
    ).parent(this.parent);
    this.boxWidth = this.canvas.width / 5 // game has 5 boxes
    this.scaleFactor = this.boxWidth / 120 // game was originally made for 120px boxes    

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

  updateCanvas() {
    resizeCanvas(
      $("#size-hack").width(),
      $("#size-hack").width()
    );

    // reparent if the window hit a breakpoint
    let parent = `${window.innerWidth < 992 ? "md-" : ""}sketch-container`;
    if (parent !== this.parent) {
      this.parent = parent;
      this.canvas.parent(this.parent);
    }
    
    // calc the new scale factor and update box width
    this.scaleFactor = (this.boxWidth = (this.canvas.width / 5)) / 120;
    redraw();
  }

  // true for disabled, false for enabled
  disableButtons(state) {
    $(".game-btn").prop("disabled", state);
  }

  processCmd(char) {
    let space = "";
    if (char === "u" && this.player.y - 1 >= 0) {
      space = this.currentLVL[this.player.y - 1][this.player.x]
      if (space === "A" || space === "X")
        this.player.y -= 1;
    } else if (char === "d" && this.player.y + 1 < this.currentLVL.length) {
      space = this.currentLVL[this.player.y + 1][this.player.x]
      if (space === "A" || space === "X")
        this.player.y += 1;
    } else if (char === "l" && this.player.x - 1 >= 0) {
      space = this.currentLVL[this.player.y][this.player.x - 1]
      if (space === "A" || space === "X")
        this.player.x -= 1;
    } else if (char === "r" && this.player.x + 1 < this.currentLVL.length) {
      space = this.currentLVL[this.player.y][this.player.x + 1]
      if (space === "A" || space === "X")
        this.player.x += 1;
    }
  }

  resetPlayer() {
    this.player.reset();
    this.win = false;
  }

  checkWin() {
    // check for win
    for (let i = 0; i < this.currentGoals.length; i++) {
      if (
        this.player.x === parseInt(this.currentGoals[i][0]) &&
        this.player.y === parseInt(this.currentGoals[i][1])
      ) {
        let audio = new Audio("assets/fanfare.mp3");
        audio.volume = 0.20;
        audio.play();
        showConfetti(3000);
        this.win = true;
        break;
      }
    }
  }

  loadLVL(num) {
    // reset drawables and grab lvl
    this.drawables = [];
    this.currentLVL = this.lvls[num];
    this.currentGoals = this.goals[num];

    for (let row = 0; row < this.currentLVL.length; row++) {
      for (let col = 0; col < this.currentLVL[row].length; col++) {
        if (this.currentLVL[row][col] === "A")
          this.player = new Sprite(this.astroImg, this.boxWidth, col, row);
        else if (this.currentLVL[row][col] === "R")
          this.drawables.push(new Sprite(this.rockImg, this.boxWidth, col, row));
        else if (this.currentLVL[row][col] === "E")
          this.drawables.push(new Sprite(this.alienImg, this.boxWidth, col, row));
      }
    }
  }

  drawGrid() {
    for (let i = 1; i < 5; i++) {
      line(this.boxWidth * i, 0, this.boxWidth * i, this.canvas.height);
      line(0, this.boxWidth * i, this.canvas.width, this.boxWidth * i);
    }
  }

  draw() {
    background(this.bgImg);

    // draw phase
    this.drawGrid();
    this.player.draw(this.boxWidth, this.scaleFactor);
    for (let item of this.drawables)
      item.draw(this.boxWidth, this.scaleFactor);

    if (this.cmdQueue.length === 0) {
      if (!this.win) this.checkWin();
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
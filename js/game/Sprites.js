class Sprite {
  constructor(img, x = 0, y = 0) {
    this.x = this.startX = x;
    this.y = this.startY = y;
    this.step = 120;
    this.sprite = img;
  }

  reset() {
    this.x = this.startX;
    this.y = this.startY;
  }

  draw() {
    imageMode(CENTER);
    image(
      this.sprite,
      60 + this.step * this.x, // x coord
      60 + this.step * this.y, // y coord
      this.sprite.width, this.sprite.height
    );
    imageMode(CORNER);
  }
}

class Astro extends Sprite {
  moveUp() {
    if (this.y !== 0)
      this.y -= 1;
  }

  moveDown() {
    if (this.y !== 4)
      this.y += 1;
  }

  moveLeft() {
    if (this.x !== 0)
      this.x -= 1;
  }

  moveRight() {
    if (this.x !== 4)
      this.x += 1;
  }
}
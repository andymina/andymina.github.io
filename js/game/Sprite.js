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
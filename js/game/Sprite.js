class Sprite {
  constructor(img, boxWidth, x = 0, y = 0) {
    this.x = this.startX = x;
    this.y = this.startY = y;
    this.boxWidth = boxWidth;
    this.sprite = img;
  }

  reset() {
    this.x = this.startX;
    this.y = this.startY;
  }

  draw(boxWidth, scaleFactor) {
    imageMode(CENTER);
    
    // add offset since images drawn from center
    let offset = boxWidth / 2;
    image(
      this.sprite,
      offset + boxWidth * this.x, // x coord
      offset + boxWidth * this.y, // y coord
      this.sprite.width * scaleFactor, // scale sprite to match new width
      this.sprite.height * scaleFactor
    );
    imageMode(CORNER);
  }
}
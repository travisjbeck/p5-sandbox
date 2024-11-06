class Ball {
  constructor(width, x, y) {
    this.sWidth = window.innerWidth;
    this.sHeight = window.innerHeight;
    this.dim = width;
    this.hue = random(0, 360);

    x = x ?? random(this.sWidth);
    y = y ?? random(this.sHeight);

    this.pos = createVector(x, y);
    this.accel = p5.Vector.random2D();
    this.accel.setMag(random(50));
  }

  draw() {
    let hit = false;

    //LEFT TO RIGHT EDGE DETECTION
    if (this.accel.x > 0) {
      //were going to the right
      if ((this.sWidth - this.pos.x) <= (this.dim / 2)) {
        this.accel.x *= -1;
        hit = true;
      };
    } else {
      //we're going to the left
      if (this.pos.x <= (this.dim / 2)) {
        this.accel.x *= -1;
        hit = true;
      }
    }

    //TOP TO BOTTOM EDGE DETECTION
    if (this.accel.y > 0) {
      if ((this.sHeight - this.pos.y) <= (this.dim / 2)) {
        this.accel.y *= -1;
        hit = true;
      }
    } else {
      if (this.pos.y <= (this.dim / 2)) {
        this.accel.y *= -1;
        hit = true;
      }
    }


    this.pos.add(this.accel);

    this.hue += 5;
    fill(((this.hue + 360) % 360), 50, 50);
    circle(this.pos.x, this.pos.y, this.dim);
  }

}

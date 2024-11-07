//when creating forces, gravity is different. Instead of dividing hte mass, you leave mass at 1, or before applying the force, you multiply the gravity force times your mass. 



class Ball {
  constructor(width, x, y) {
    this.sWidth = window.innerWidth;
    this.sHeight = window.innerHeight;
    this.dim = width;
    this.r = width / 2;
    this.hue = random(0, 360);

    x = x ?? random(this.sWidth);
    y = y ?? random(this.sHeight);

    this.pos = createVector(x, y);
    this.accel = p5.Vector.random2D();
    this.accel.setMag(random(50));
  }

  edges() {
    //LEFT TO RIGHT EDGE DETECTION
    if ((this.pos.x + this.r) >= this.sWidth) {
      this.pos.x = this.sWidth - this.r;
      this.accel.x *= -1;
    } else if ((this.pos.x - this.r) < 0) {
      this.pos.x = this.r;
      this.accel.x *= -1;
    }

    //TOP TO BOTTOM EDGE DETECTION
    if ((this.pos.y + this.r) >= this.sHeight) {
      this.pos.y = this.sHeight - this.r;
      this.accel.y *= -1;
    } else if ((this.pos.y - this.r) < 0) {
      this.pos.y = this.r;
      this.accel.y *= -1;
    }
  }

  update() {
    this.pos.add(this.accel);
    this.hue += 5;
  }

  draw() {
    let hit = false;

    this.update();
    this.edges();

    fill(((this.hue + 360) % 360), 180, 50);
    circle(this.pos.x, this.pos.y, this.dim);
  }

}

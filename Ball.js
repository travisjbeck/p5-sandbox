//when creating forces, gravity is different. Instead of dividing the mass, you leave mass at 1, or before applying the force, you multiply the gravity force times your mass. 


//friction coefficient
const MU = 0.2;
const MAX_MASS = 300;
class Ball {
  constructor(width, x, y, hue) {
    this.sWidth = window.innerWidth;
    this.sHeight = window.innerHeight;
    this.dim = width;
    this.r = width / 2;
    this.hue = hue;
    this.mass = this.r ^ 2;

    x = x ?? random(this.sWidth);
    y = y ?? random(this.sHeight);

    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);  // Add velocity vector
    this.accel = createVector(0, 0);
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass)
    this.accel.add(f);
  }

  edges() {
    //LEFT TO RIGHT EDGE DETECTION
    if ((this.pos.x + this.r) >= this.sWidth) {
      this.pos.x = this.sWidth - this.r;
      this.vel.x *= -1;  // Reflect velocity instead of acceleration
      this.addFriction();
    } else if ((this.pos.x - this.r) <= 0) {
      this.pos.x = this.r;
      this.vel.x *= -1;  // Reflect velocity instead of acceleration
      this.addFriction();
    }

    //TOP TO BOTTOM EDGE DETECTION
    if ((this.pos.y + this.r) >= this.sHeight) {
      this.pos.y = this.sHeight - this.r;
      let dampening = map(this.mass, 1, MAX_MASS, -1, 0);
      this.vel.y *= dampening;  // Dampen velocity instead of acceleration
      this.addFriction();
    } else if ((this.pos.y - this.r) <= 0) {
      let dampening = map(this.mass, 1, MAX_MASS, -1, 0);
      this.pos.y = this.r;
      this.vel.y *= dampening;  // Dampen velocity instead of acceleration
      this.addFriction();
    }
  }

  addFriction() {
    let friction = this.vel.copy();  // Use velocity instead of acceleration
    friction.normalize();
    friction.mult(-1)

    let normal = this.mass;
    friction.setMag(MU * normal);
    this.applyForce(friction)
  }

  update() {
    // Update velocity by adding acceleration
    this.vel.add(this.accel);
    // Update position by adding velocity
    this.pos.add(this.vel);
    // Reset acceleration
    this.accel.mult(0);
  }

  drawVelocityVector() {
    // Scale velocity for better visualization
    let scaledVel = this.vel.copy().mult(5);
    let endPoint = p5.Vector.add(this.pos, scaledVel);

    let diff = p5.Vector.sub(this.pos, endPoint);
    let mag = diff.mag();
    if (mag > 10) {
      Utils.drawArrowhead(endPoint, this.pos)
      line(this.pos.x, this.pos.y, endPoint.x, endPoint.y);

    }
  }

  draw() {
    this.update();
    this.edges();

    // Draw velocity vector
    stroke(255);
    this.drawVelocityVector()

    fill(((this.hue + 360) % 360), 50, 50, 0.7);
    circle(this.pos.x, this.pos.y, this.dim);
  }
}
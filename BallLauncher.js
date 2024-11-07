class BallLauncher {

  constructor() {
    this.isPressed = false;
    this.v1 = createVector(0, 0);
    this.v2 = null;
    this.directionVector = null;

    this.pressedTime = null;
    this.ballSize = 0;
  }

  mousePressed() {
    this.isPressed = true;
    this.pressedTime = millis();
    this.v1 = createVector(mouseX, mouseY);
  }

  mouseReleased() {
    let pressDuration = millis() - this.pressedTime;

    // Normalize time (let's say max time is 2000ms)
    let normalizedTime = constrain(pressDuration, 0, 3000);

    // Map the time to range 10-50
    this.ballSize = map(normalizedTime, 0, 2000, 3, 200);
    this.isPressed = false;
  }

  draw() {
    this.directionVector = null;
    if (this.isPressed) {
      this.v2 = createVector(mouseX, mouseY);
      stroke(255)
      line(this.v1.x, this.v1.y, this.v2.x, this.v2.y);
    } else if (this.v2) {
      this.directionVector = p5.Vector.sub(this.v2, this.v1).mult(-1, -1);
      this.directionVector.mult(2);
      this.v2 = null;
    }
  }
}
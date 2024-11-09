class BallLauncher {

  constructor() {
    this.isPressed = false;
    this.v1 = createVector(0, 0);
    this.v2 = null;
    this.directionVector = null;
    this.pressedTime = null;
    this.ballSize = 0;
    this.hue = random(0, 360);
  }

  mousePressed() {
    this.isPressed = true;
    this.pressedTime = millis();
    this.v1 = createVector(mouseX, mouseY);
  }

  drawGhostBall() {
    let pressDuration = millis() - this.pressedTime;
    // Normalize time (let's say max time is 2000ms)
    let normalizedTime = constrain(pressDuration, 0, 2000);
    // Map the time to range 10-50
    this.ballSize = map(normalizedTime, 0, 2000, 3, 200);
    fill(0, 0, 20, 0.2); // Hue=0, Saturation=0%, Lightness=20%, Alpha=0.2
    stroke(((this.hue) % 360), 50, 50, 0.7);
    circle(this.v1.x, this.v1.y, this.ballSize,);
  }

  mouseReleased() {
    this.isPressed = false;
  }


  // Add this new method to draw the arrowhead

  draw() {
    this.directionVector = null;
    this.hue += 1;

    if (this.isPressed) {
      this.v2 = createVector(mouseX, mouseY);

      let diff = p5.Vector.sub(this.v2, this.v1);
      let mag = diff.mag();
      if (mag < 10) {
        return
      }

      stroke(255, 0.3)
      line(this.v1.x, this.v1.y, this.v2.x, this.v2.y);
      // Draw the arrow head

      Utils.drawArrowhead(this.v1, this.v2);
      this.drawGhostBall();
      noStroke()
    } else if (this.v2) {
      this.directionVector = p5.Vector.sub(this.v2, this.v1).mult(-1, -1);
      this.directionVector.mult(2);
      this.v2 = null;
    }
  }
}
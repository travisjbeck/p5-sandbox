const width = window.innerWidth;
const height = window.innerHeight;

let balls = [];
let isMouseDown = false;
let ballLauncher;

function setup() {
  createCanvas(width, height);
  background(0);
  colorMode(HSL)
  balls = [];
  ballLauncher = new BallLauncher();
}


function mousePressed() {
  ballLauncher.mousePressed();
}

function mouseReleased() {
  ballLauncher.mouseReleased();
}

function draw() {
  background(0);
  noStroke();

  ballLauncher.draw();

  if (ballLauncher.directionVector && ballLauncher.ballSize) {
    const ball = new Ball(ballLauncher.ballSize, mouseX, mouseY);
    ball.applyForce(ballLauncher.directionVector);
    balls.push(ball);
  }

  for (ball of balls) {

    let gravity = createVector(0, 1.3);
    gravity.mult(ball.mass);
    ball.applyForce(gravity);

    if (keyIsDown(32)) {  // 32 is the keyCode for space bar
      let wind = createVector(1, 0);
      //wind.setMag(50);
      ball.applyForce(wind);
    }

    ball.draw();
  }
  fill(255)
}
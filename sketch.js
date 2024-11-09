const width = window.innerWidth;
const height = window.innerHeight;
const windSpeed = 5;
let gravitationalForce = 2;

let balls = [];
let isMouseDown = false;
let ballLauncher;

function setup() {
  createCanvas(width, height);
  colorMode(HSL)
  balls = [];
  ballLauncher = new BallLauncher();
  background(0);
}

function mousePressed() {
  ballLauncher.mousePressed();
}

function mouseReleased() {
  ballLauncher.mouseReleased();
}

function keyPressed(key) {
  if (key.code === "Space") {  // 32 is the keyCode for space bar
    //reverse gravity
    gravitationalForce *= -1
  }
}

function draw() {
  background(0); // Hue=0, Saturation=0%, Lightness=20%, Alpha=0.2
  noStroke();

  ballLauncher.draw();

  if (ballLauncher.directionVector) {
    const ball = new Ball(ballLauncher.ballSize, ballLauncher.v1.x, ballLauncher.v1.y, ballLauncher.hue);
    ball.applyForce(ballLauncher.directionVector);
    balls.push(ball);
  }

  for (ball of balls) {

    let gravity = createVector(0, gravitationalForce);
    gravity.mult(ball.mass);
    ball.applyForce(gravity);

    // if (keyIsDown(32)) {  // 32 is the keyCode for space bar
    //   let wind = createVector(windSpeed, 0);
    //   //wind.setMag(50);
    //   ball.applyForce(wind);
    // }

    ball.draw();
  }
}
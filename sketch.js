const width = window.innerWidth;
const height = window.innerHeight;

const seed1 = { x: 604, y: 352 }
let balls = [];

function setup() {
  createCanvas(width, height);
  background(0);
  colorMode(HSL)
  balls = [new Ball(60), new Ball(50), new Ball(100)];
}

function mouseClicked() {
  const newBall = new Ball(random(250), mouseX, mouseY);
  balls.push(newBall);
}


function draw() {
  background(0);
  noStroke();
  for (ball of balls) {
    ball.draw();
  }
  fill(255)
  text(`${balls.length}`, 50, 50).textSize(40)
}
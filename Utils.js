const Utils = {
  drawArrowhead(v1, v2) {

    fill(0, 0, 20, 0.8); // Hue=0, Saturation=0%, Lightness=20%, Alpha=0.2
    let angle = atan2(v1.y - v2.y, v1.x - v2.x);
    let x = v1.x;
    let y = v1.y;

    push();
    translate(x, y);
    rotate(angle);

    // Arrow properties
    let arrowSize = 15;  // Size of the arrowhead

    // Draw the arrowhead
    beginShape();
    vertex(-arrowSize, -arrowSize / 2);
    vertex(0, 0);
    vertex(-arrowSize, arrowSize / 2);
    endShape();

    pop();
  }
}
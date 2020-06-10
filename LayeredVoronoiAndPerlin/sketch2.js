function setup() {
    createCanvas(300, 300);
}

function draw() {
    drawingContext.fillRect(0, 0, 300, 300);
    drawingContext.translate(150, 150);
    
    // Create a circular clipping path
    drawingContext.beginPath();
    drawingContext.arc(0, 0, 60, 0, Math.PI * 2, true);
    drawingContext.clip();
    
    // draw background
    var lingrad = drawingContext.createLinearGradient(0, -75, 0, 75);
    lingrad.addColorStop(0, '#232256');
    lingrad.addColorStop(1, '#143778');
    
    drawingContext.fillStyle = lingrad;
    drawingContext.fillRect(-75, -75, 150, 150);
    
    // draw stars
    for (var j = 1; j < 50; j++) {
    drawingContext.save();
    drawingContext.fillStyle = '#fff';
    drawingContext.translate(75 - Math.floor(Math.random() * 150),
                  75 - Math.floor(Math.random() * 150));
    drawStar(drawingContext, Math.floor(Math.random() * 4) + 2);
    drawingContext.restore();
    }
  
}

function drawStar(drawingContext, r) {
    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.moveTo(r, 0);
    for (var i = 0; i < 9; i++) {
    drawingContext.rotate(Math.PI / 5);
    if (i % 2 === 0) {
      drawingContext.lineTo((r / 0.525731) * 0.200811, 0);
    } else {
      drawingContext.lineTo(r, 0);
    }
    }
    drawingContext.closePath();
    drawingContext.fill();
    drawingContext.restore();
}
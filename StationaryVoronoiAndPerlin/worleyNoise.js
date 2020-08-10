let numberOfCells = 25;
let distributionOfCells = 1;
let nClosestNeighbor = 0;
let cellDiameter = 50;
let brightest = 255;
let darkest = 0;

let minRadius = 100;
let maxRadius = 200;

let cells = [];
let vals = {};

function randomG(v, range) {
    // approximates gaussian distribution by averaging repeated random numbers
    // v : number of repeats
    // range : maximum number
    var r = 0;
    for (var i = 0; i < v; i++) {
        r += random(range);
    }
    return r / v;
}

function changedControls() {
  createCanvas(500, 500);
  
  img = createImage(width, height);
  img.loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let distances = [];
      for (let i = 0; i < cells.length; i++) {
        distances.push(dist(x, y, cells[i].x, cells[i].y));
      }
      let sorted = sort(distances);
      let noise = map(sorted[nClosestNeighbor], 0, vals.cellDiameter, 0, 255-vals.darkest);
      if (noise < 15) {
        noise = 15;
      }
      img.set(x, y, color(0,255,0,vals.brightest-noise));
    }
  }
  img.updatePixels();
}

function createCells() {
  cells = [];
  for (let cell = 0; cell < vals.numberOfCells; cell++) {
    cells.push(createVector(randomG(vals.distributionOfCells, width), randomG(vals.distributionOfCells, height)));
  }
}

function setup() {
  controls = makeControls()
  controls.map(d => vals[d.id] = d.control.value());
  
  createCanvas(500, 500);
  
  createCells();
  
  img = createImage(width, height);
  img.loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let distances = [];
      for (let i = 0; i < cells.length; i++) {
        distances.push(dist(x, y, cells[i].x, cells[i].y));
      }
      let sorted = sort(distances);
      let noise = map(sorted[nClosestNeighbor], 0, vals.cellDiameter, 0, 255-vals.darkest);
      if (noise < 55) {
        noise = 55;
      }
      img.set(x, y, color(0,255,0,vals.brightest-noise));
    }
  }
  img.updatePixels();
}

function draw() {
  controls.map(d => vals[d.id] = d.control.value());
  
  drawingContext.beginPath();
  for (let a = 0; a < TWO_PI; a += TWO_PI / vals.radiusDivisions) {
    // loops through angles of circle
    let xoff = map(cos(a), -1, 1, 0, vals.minRadius / vals.perlinVariability);
    let yoff = map(sin(a), -1, 1, 0, vals.minRadius / vals.perlinVariability);
    // map radius to between min and max radii
    let radius = map(noise(xoff, yoff), 0, 1, vals.minRadius, vals.maxRadius);
    let x = radius * cos(a);
    let y = radius * sin(a);
    // adds new vertex to the circle at mapped radius
    if (a == 0) {
      drawingContext.moveTo(x + width / 2, y + height / 2);
    } else {
      drawingContext.lineTo(x + width / 2, y + height / 2);   
    }
  }
  drawingContext.clip();
  background(0);
  background(img);
}
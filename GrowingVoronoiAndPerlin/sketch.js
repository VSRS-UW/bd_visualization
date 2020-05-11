// Variables and Constants

var absoluteFrame = 0;
let growthFrames = 300;

// Voronoi
let maxCellSpread = 200;
let minCells = 2;
let maxCells = 200;
let spreadSpeed = 1;
var cells = [];
var propogateProb = 0.02;

// Perlin Noise
let radiusDivisions = 2000;
let perlinVariability = 50;
let startingRadius = 1;
let minRadiusAddition = 0;
let maxRadiusAddition = 1.5;
var previousCenters = [[]];
var previousLobes = [[]];

// propogate Location
var propX = 700/2;
var propY = 600/2;

function setup() {
  // sets up canvas, voronoi settings, and points
  createCanvas(700, 600);
  // set up voronoi settings
  voronoiCellStrokeWeight(1);
  voronoiSiteStrokeWeight(3);
  voronoiCellStroke(0);
  voronoiSiteStroke(255);
  voronoiSiteFlag(false);
  // create center points of starting cells
  for (var walker=0; walker<minCells; walker++) {
    cells.push([random(2)-1+width/2, random(2)-1+height/2]);
  }
  // pass center points to voronoi
  voronoiSites(cells);
  voronoi(700, 600, true);
  // sets initial radius of perlin noise loop to 1
  for (let a=0; a<TWO_PI; a+=TWO_PI/radiusDivisions) {
    previousLobes[0].push(1);
  };
  previousCenters[0] = [width/2, height/2];
}

function mouseClicked() {
  propX = mouseX;
  propY = mouseY;
  var newLobe = [];
  for (let a=0; a<TWO_PI; a+=TWO_PI/radiusDivisions) {
    newLobe.push(1)
  };
  previousLobes.push(newLobe);
  previousCenters.push([propX, propY]);
}

function draw() {
  background('rgba(100,100,100,1)');
  // changes propogate probability to 0 once max cell number reached
  if (cells.length > maxCells) {
    propogateProb = 0;
  };
  // below controls the propogation and diffusion of the cells
  // only occurs during growth frames
  if (absoluteFrame < growthFrames) {
      for (var walker=0; walker<cells.length; walker++) {
        // if cells propogates, generate new cell near center of lichen
        if (random(1) < propogateProb) {
            let center = previousCenters[int(random(previousCenters.length))];
            cells.push([random(2)-1+center[0], random(2)-1+center[1]])
        }
        // cells diffuse away from closest neighbor
        if (cells.length > 1) {
            // determines closest neighbor to each cell
            if (walker == 0) {
                var closestNeighbor = 1;
                var closestDistance = Math.sqrt(Math.pow(cells[walker][0] - cells[1][0], 2) + Math.pow(cells[walker][1] - cells[1][1], 2));
            } else {
                var closestNeighbor = 0;
                var closestDistance = Math.sqrt(Math.pow(cells[walker][0] - cells[0][0], 2) + Math.pow(cells[walker][1] - cells[0][1], 2));
            }
            for (var neighbor=0; neighbor<cells.length; neighbor++) {
                if (neighbor != walker) {
                    distance = Math.sqrt(Math.pow(cells[walker][0] - cells[neighbor][0], 2) + Math.pow(cells[walker][1] - cells[neighbor][1], 2))
                    if (distance < closestDistance) {
                        closestNeighbor = neighbor;
                        closestDistance = distance;
                    }
                }
            }
            // measures distance in x and y directions
            xDirection = cells[walker][0] - cells[closestNeighbor][0];
            yDirection = cells[walker][1] - cells[closestNeighbor][1];
            // rescales distances by dividing by either x or y distance
            // this is crude, may want to always have the cells diffuse at the same speed
            if (xDirection != 0 && yDirection != 0) {
                if (Math.abs(xDirection) > Math.abs(yDirection)) {
                    scale = Math.abs(xDirection)*spreadSpeed;
                } else {
                    scale = Math.abs(yDirection)*spreadSpeed;
                }
            } else if (xDirection != 0) {
                scale = Math.abs(xDirection)*spreadSpeed;
            } else if (yDirection != 0) {
                scale = Math.abs(yDirection)*spreadSpeed;
            } else {
                scale = spreadSpeed;
            }
            // if nearest neighbor has the same coordinate, randomly move
            if (xDirection == 0 & yDirection == 0) {
                randomXMovement = int(random(2));
                if (randomXMovement == 1) {
                    cells[walker][0] += 0.1;
                } else {
                    cells[walker][0] -= 0.1;
                }
                randomYMovement = int(random(2));
                if (randomYMovement == 1) {
                    cells[walker][1] += 0.1;
                } else {
                    cells[walker][1] -= 0.1;
                }
            } else {
                // else move away from nearest neighbor
                cells[walker][0] += xDirection/scale;
                cells[walker][1] += yDirection/scale;
            }
            // limits cell diffusion to maxCellSpread
            //if (cells[walker][0] > width/2 + maxCellSpread) {
            //    cells[walker][0] = width/2 + maxCellSpread;
            //} else if (cells[walker][0] < width/2 - maxCellSpread) {
            //    cells[walker][0] = width/2 - maxCellSpread;
            //}
            //if (cells[walker][1] > height/2 + maxCellSpread) {
            //    cells[walker][1] = height/2 + maxCellSpread;
            //} else if (cells[walker][1] < height/2 - maxCellSpread) {
            //    cells[walker][1] = height/2 - maxCellSpread;
            //}
        }
      }
  }
  voronoiClearSites();
  voronoiSites(cells);
  voronoi(700, 600, true);
  voronoiDraw(0, 0, false, false);
  
  
  stroke(255);
  fill(255);
  // perlin noise loop for outer shape
  beginShape();
  vertex(0, 0);
  vertex(0, height);
  vertex(width, height);
  vertex(width, 0);
  for (lobe=0; lobe<previousLobes.length; lobe++) {
    beginContour();
    for (let a = 0; a < TWO_PI; a += TWO_PI/radiusDivisions) {
      var r = previousLobes[lobe][Math.round(a/(TWO_PI/radiusDivisions), 1)];
      // only grow during growth frames
      if (absoluteFrame < growthFrames) {
          let xoff = map(cos(a), -1, 1, 0, absoluteFrame/perlinVariability);
          let yoff = map(sin(a), -1, 1, 0, absoluteFrame/perlinVariability);
          let displayRadius = map(noise(xoff, yoff), 0, 1, minRadiusAddition, maxRadiusAddition);
          r = displayRadius + previousLobes[lobe][Math.round(a/(TWO_PI/radiusDivisions), 1)];
      }
      let x = r * cos(a);
      let y = r * sin(a);
      previousLobes[lobe][Math.round(a/(TWO_PI/radiusDivisions), 1)] = r;
      vertex(x + previousCenters[lobe][0], y + previousCenters[lobe][1]);
    }
    endContour(CLOSE);  
  };
  endShape(CLOSE);
  absoluteFrame++;
}
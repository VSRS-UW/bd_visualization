let minRadius = 100;
let maxRadius = 300;
let radiusDivisions = 2000;
let perlinVariability = 25;
var absoluteFrame = 0;
var numberOfCells = 100;
var cells = [];

function randomG(v, range){
    // approximates gaussian distribution by averaging repeated random numbers
    // v : number of repeats
    // range : maximum number
    var r = 0;
    for(var i = 0; i < v; i++){
        r += random(range);
    }
    return r / v;
}

function setup() {
    // sets up canvas, voronoi settings, and points
    createCanvas(700, 600);
    // set up voronoi settings
    voronoiCellStrokeWeight(1);
    voronoiSiteStrokeWeight(3);
    voronoiCellStroke(255);
    voronoiSiteStroke(255);
    voronoiSiteFlag(false);
    // create center points of cells
    for (var cell=0; cell<numberOfCells; cell++) {
        cells.push([int(randomG(5, width)), int(randomG(5, height))]);
    }
    // pass center points to voronoi
    voronoiSites(cells);
    voronoi(700, 600, true);
}

function draw() {
    // draws for each frame
    background(255);
    stroke(255,255,255);
    fill('rgba(100,100,100,1)');
    // perlin noise loop for outer shape
    beginShape();
    for (let a = 0; a < TWO_PI; a += TWO_PI/radiusDivisions) {
        // loops through angles of circle
        let xoff = map(cos(a), -1, 1, 0, minRadius/perlinVariability);
        let yoff = map(sin(a), -1, 1, 0, minRadius/perlinVariability);
        // map radius to between min and max radii
        let radius = map(noise(xoff, yoff), 0, 1, minRadius, maxRadius);
        let x = radius * cos(a);
        let y = radius * sin(a);
        // adds new vertex to the circle at mapped radius
        vertex(x + width/2, y + height/2)
    }
    endShape(CLOSE);
    // draw voronoi
    voronoiDraw(0, 0, false, true);
}
var cells = [];
let controls = []; // define this globally
var clicked = [];
var edge = [];

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

function resetCells() {

    
}

function setup() {
    
    // sets up canvas, voronoi settings, and points
    createCanvas(700, 600);
    // set up voronoi settings
    voronoiCellStrokeWeight(1);
    voronoiSiteStrokeWeight(3);
    voronoiCellStroke(87, 183, 0);
    voronoiSiteStroke(255);
    voronoiSiteFlag(false);

    voronoiClearSites()
    cells = [];
    // create center points of cells

    for (var cell = 0; cell < 1000; cell++) {
        cells.push([int(randomG(1, width)), int(randomG(1, height))]);
    }

    // pass center points to voronoi
    voronoiSites(cells);
    voronoi(700, 600, true);
}

function draw() {
    //background(255);
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 0;
    drawingContext.shadowBlur = 5;
    drawingContext.shadowColor = "black";
    //fill(100, 100, 100, 255);
    //noStroke();
    //for (var e=0; e < edge.length; e++) {
    //  ellipse(edge[e][0], edge[e][1], edge[e][2], edge[e][3]);
    //}
    voronoiDraw(0, 0, true, true, clicked);
}

function mousePressed(){
    edge.push([mouseX, mouseY, random(50, 100), random(50, 100), random(100, 255)]);
    var cellId = voronoiGetSite(mouseX, mouseY, false);
  	if(cellId !== undefined){
  	  if (!clicked.includes(cellId)) {
        clicked.push(cellId);  	    
  	  }
  	}
}

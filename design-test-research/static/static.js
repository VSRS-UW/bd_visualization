var cells = [];
let controls = []; // define this globally
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

function resetCells() {
    // Get new number of cells
    let numCells = controls.filter(d => d.id == "numberOfCells")[0].control.value();
    let cellDist = controls.filter(d => d.id == "cellDistribution")[0].control.value();

    voronoiClearSites()
    cells = [];
    // create center points of cells

    for (var cell = 0; cell < numCells; cell++) {
        cells.push([int(randomG(cellDist, width))+vals.hBias, int(randomG(cellDist, height))+vals.vBias]);
    }

    // pass center points to voronoi
    voronoiSites(cells);
    voronoi(700, 600, true);
}

function preload() {
    // Make controls
    controls = makeControls()
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

    controls.map(d => vals[d.id] = d.control.value());

    // Reset the cell values
    resetCells();
}

function resetCanvas() {
    createCanvas(700, 600);
} 

function draw() {

    // Get values from controls:
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

    // draws for each frame
    background('rgba(100, 100, 100, 1)');
    voronoiDraw(0, 0, false, true);
}


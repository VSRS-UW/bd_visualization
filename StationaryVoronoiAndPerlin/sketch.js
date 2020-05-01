var cells = [];
let controls = []; // define this globally

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
        cells.push([int(randomG(cellDist, width)), int(randomG(cellDist, height))]);
    }

    // pass center points to voronoi
    voronoiSites(cells);
    voronoi(700, 600, true);

    // Redraw
    redraw()
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

    // Make controls
    controls = makeControls()

    // Reset the cell values
    resetCells()

    // Only redraw when the controls are manipulated
    noLoop()

}

// Function to adjust the size: scale up and translate around center
function adjustSize(cell, scaleFactor) {
    // Get cell x and y center
    let adjusted = [];
    const centerX = d3.mean(cell, d => d[0])
    const centerY = d3.mean(cell, d => d[1])

    // Depending on the quadrant, adjust the point outwards
    cell.map(d => {
        // Compute new x position
        const newX = d[0] < centerX ? d[0] - scaleFactor : d[0] + scaleFactor * random(.9, 1.1)
        const newY = d[1] < centerY ? d[1] - scaleFactor : d[1] + scaleFactor * random(.9, 1.1)
        adjusted.push([newX, newY])
    })
    return adjusted
}

function draw() {
    // Get values from controls:
    let vals = {};
    controls.map(d => vals[d.id] = d.control.value());

    // Draw background
    background(255);
    stroke(255, 255, 255);
    fill('rgba(100,100,100,1)');

    // Draw outershape
    drawOuterShape(vals)

    // Get the cells to draw them directly
    var cells = voronoiGetCellsJitter();

    // Iterate through the cells
    cells.map((cell, i) => {
        push() // save current rotation settings
        beginShape()
        stroke(0, 0, 0, 100)

        // Adjust the size of each cell
        const adjustedSizes = adjustSize(cell, vals.cellScaling)

        // Iterate through the vertices in each cell
        adjustedSizes.map(ver => vertex(ver[0], ver[1]))

        fill(0, 100, 0, 100);
        endShape() // close shape
        pop() // reset rotation settings
    })
}

// Draw the "outer" shape
drawOuterShape = vals => {
    beginShape();
    // loops through angles of circle
    for (let a = 0; a < TWO_PI; a += TWO_PI / vals.radiusDivisions) {
        // Use noise to offset the x and y values
        let xoff = map(cos(a), -1, 1, 0, vals.minRadius / vals.perlinVariability);
        let yoff = map(sin(a), -1, 1, 0, vals.minRadius / vals.perlinVariability);

        // map radius to between min and max radii
        let radius = map(noise(xoff, yoff), 0, 1, vals.minRadius, vals.maxRadius);
        let x = radius * cos(a);
        let y = radius * sin(a);

        // add new vertex to the circle at mapped radius
        vertex(x + width / 2, y + height / 2)
    }
    endShape(CLOSE);
} 

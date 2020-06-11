// save this file as sketch.js
// Sketch One
var s = function( p ) { // p could be any variable name
  let pcells = [];
  
  p.setup = function() {
    p.createCanvas(700, 600);
    p.voronoiCellStrokeWeight(5);
    p.voronoiSiteStrokeWeight(3);
    p.voronoiCellStroke(255);
    p.voronoiSiteStroke(255);
    p.voronoiSiteFlag(false);
    p.resetCells();
  };

  p.draw = function() {
    p.noiseSeed(p.int(p.random(0,10000)));
    //p.randomSeed(2);
    p.drawingContext.beginPath();
    for (let a = 0; a < p.TWO_PI; a += p.TWO_PI / 100) {
        // loops through angles of circle
        let xoff = p.map(p.cos(a), -1, 1, 0, 100 / 20);
        let yoff = p.map(p.sin(a), -1, 1, 0, 100 / 20);
        // map radius to between min and max radii
        let radius = p.map(p.noise(xoff, yoff), 0, 1, 50, 300);
        let x = radius * p.cos(a);
        let y = radius * p.sin(a);
        // adds new vertex to the circle at mapped radius
        if (a == 0) {
            p.drawingContext.moveTo(x + p.width / 2, y + p.height / 2);
        } else {
            p.drawingContext.lineTo(x + p.width / 2, y + p.height / 2);   
        };
    };
    p.drawingContext.clip();

    // draws for each frame
    p.background('rgba(50, 85, 50, 1)');
    p.voronoiClearSites();
    p.voronoiSites(pcells);
    p.voronoi(700, 600, false);
    p.voronoiDraw(0, 0, false, false);
  };
  
  p.randomG = function(v, range) {
    // approximates gaussian distribution by averaging repeated random numbers
    // v : number of repeats
    // range : maximum number
    var r = 0;
    for (var i = 0; i < v; i++) {
        r += p.random(range);
    };
    return r / v;
  };
  
  p.resetCells = function() {
    // Get new number of cells
    let numCells = 100; //controls.filter(d => d.id == "numberOfCells")[0].control.value();
    let cellDist = 5; //controls.filter(d => d.id == "cellDistribution")[0].control.value();

    //p.voronoiClearSites()
    // create center points of cells

    for (var cell = 0; cell < numCells; cell++) {
        pcells.push([p.int(p.randomG(cellDist, p.width)), p.int(p.randomG(cellDist, p.height))]);
    }

    console.log(pcells);

    // pass center points to voronoi
    //p.voronoiSites(pcells);
    //p.randomSeed(2);
    //p.voronoi(700, 600, false);
  };
  
};
var myp5 = new p5(s, 'c1');

// Sketch Two
var t = function(q) { // q could be any variable name
  
  let qcells = [];

  q.setup = function() {
    q.createCanvas(700, 600);
    q.voronoiCellStrokeWeight(1);
    q.voronoiSiteStrokeWeight(3);
    q.voronoiCellStroke(255);
    q.voronoiSiteStroke(255);
    q.voronoiSiteFlag(false);
    q.resetCells();
  };

  q.draw = function() {
    //console.log(q.int(q.random()));
    q.noiseSeed(q.int(q.random(0,10000)));
    //q.randomSeed(302);
    //let vals = {};
    //controls.map(d => vals[d.id] = d.control.value());
    
    q.drawingContext.beginPath();
    for (let a = 0; a < q.TWO_PI; a += q.TWO_PI / 100) {
        // loops through angles of circle
        let xoff = q.map(q.cos(a), -1, 1, 0, 100 / 20);
        let yoff = q.map(q.sin(a), -1, 1, 0, 100 / 20);
        // map radius to between min and max radii
        let radius = q.map(q.noise(xoff, yoff), 0, 1, 50, 250);
        let x = radius * q.cos(a);
        let y = radius * q.sin(a);
        // adds new vertex to the circle at mapped radius
        if (a == 0) {
            q.drawingContext.moveTo(x + q.width / 2, y + q.height / 2);
        } else {
            q.drawingContext.lineTo(x + q.width / 2, y + q.height / 2);   
        };
    };
    q.drawingContext.clip();

    // draws for each frame
    q.background('rgba(80, 200, 100, 1)');
    q.voronoiClearSites();
    q.voronoiSites(qcells);
    q.voronoi(700, 600, false);
    q.voronoiDraw(0, 0, false, false);
  };
  
  q.randomG = function(v, range) {
    // approximates gaussian distribution by averaging repeated random numbers
    // v : number of repeats
    // range : maximum number
    var r = 0;
    for (var i = 0; i < v; i++) {
        r += q.random(range);
    };
    return r / v;
  };
  
  q.resetCells = function() {
    // Get new number of cells
    let numCells = 100; //controls.filter(d => d.id == "numberOfCells")[0].control.value();
    let cellDist = 5; //controls.filter(d => d.id == "cellDistribution")[0].control.value();

    //q.voronoiClearSites()
    //create center points of cells

    for (var cell = 0; cell < numCells; cell++) {
        qcells.push([q.int(q.randomG(cellDist, q.width)), q.int(q.randomG(cellDist, q.height))]);
    }
    console.log(qcells);

    // pass center points to voronoi
    //q.voronoiSites(qcells);
    //q.voronoi(700, 600, false);
  };
};
var myp5 = new p5(t, 'c2');
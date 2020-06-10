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

var canvas1 = function(c1) {
    var cells = [];
    let controls = []; // define this globally
    
    c1.setup = function() {
        // sets up canvas, voronoi settings, and points
        c1.createCanvas(700, 600);
        //c1.background(0,0,0);
        //layer1.position(200, 0);
        // set up voronoi settings
        voronoiCellStrokeWeight(1);
        voronoiSiteStrokeWeight(3);
        voronoiCellStroke(255);
        voronoiSiteStroke(255);
        voronoiSiteFlag(false);
    
        // Reset the cell values
        //resetCells();
    };
    
    c1.draw = function() {
        // Get values from controls:
        let vals = {};
        //controls.map(d => vals[d.id] = d.control.value());
        
        drawingContext.beginPath();
        for (let a = 0; a < TWO_PI; a += TWO_PI / 100) {
            // loops through angles of circle
            let xoff = map(cos(a), -1, 1, 0, 100 / 100);
            let yoff = map(sin(a), -1, 1, 0, 100 / 100);
            // map radius to between min and max radii
            let radius = map(noise(xoff, yoff), 0, 1, 100, 200);
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
        background('rgba(0, 0, 0, 1)');
        voronoiDraw(0, 0, false, true);
            
    };
};
var lichen = new p5(canvas1, 'c1');



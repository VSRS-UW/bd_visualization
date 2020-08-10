let points = [];
let rows = 10; // Sqrt of number of cells
let k = 0;
let max_d = 110;
let scl;
let noiseArray;
let img;
let controls = []; // define this globally

function create2DArray(rows, cols) {
  return new Array(rows).fill().map(() => new Array(cols).fill(0));
}

//function preload() {
//    // Make controls
//    controls = makeControls()
//}

function setup() {
  createCanvas(400, 400);
  points = []
  noiseArray = create2DArray(width, height);
  scl = width/rows
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < rows; j++) {
      let x =  random((i*scl)+k, ((i+1)*scl)-k);
      let y = random((j*scl)+k, ((j+1)*scl)-k);
      points.push(createVector(x, y));
    }
  }
  console.log(points);
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let d = worley(i, j);
      noiseArray[i][j] = d
      set(i, j, color(d))
    }
  }
  img = createImage(400, 400);
  img.loadPixels();
  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      let d = noiseArray[i][j]
      d = map(d, 0, 100, 0, 255);
      d = 255-d
      img.set(i, j, color(255,255,255,d));
    }
  }
  img.updatePixels();
}

function draw() {
  //drawingContext.beginPath();
  //for (let a = 0; a < TWO_PI; a += TWO_PI / 200) {
  //    // loops through angles of circle
  //    let xoff = map(cos(a), -1, 1, 0, 100/50);
  //    let yoff = map(sin(a), -1, 1, 0, 100/50);
  //    // map radius to between min and max radii
  //    let radius = map(noise(xoff, yoff), 0, 1, 100, 200);
  //    let x = radius * cos(a);
  //    let y = radius * sin(a);
  //    // adds new vertex to the circle at mapped radius
  //    if (a == 0) {
  //        drawingContext.moveTo(x + width / 2, y + height / 2);
  //    } else {
  //        drawingContext.lineTo(x + width / 2, y + height / 2);   
  //    }
  //}
  //drawingContext.clip();
  background(0);
  background(img);
  noLoop();
}

function worley(x, y){
  let space = createVector(x, y);
  let closest = closest_point(space);
  let d = space.dist(closest);
  return d
}

function index(i, j){
  return i*rows+j 
}

function closest_point(p) {
  let x = floor(p.x/scl);
  let y = floor(p.y/scl);
  let closest = points[0].copy()
  let min_d = Infinity
  for(let i =-1; i < 2; i++)
  {
    for(let j = -1; j < 2; j++)
    {
     let point = points[index(x+i, y+j)]
      if(point)
      {
      let d = p.dist(point)
      if(d < min_d)
      {
       min_d = d;
        closest = point
      }
      }
    }
  }
  return closest
}
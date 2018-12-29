const w = 100;
const r = 30;
let k, ph, pm, ps;
let grid = [];

function setup() {
    colorMode(HSB,360,100,100,1);
    frameRate(10);
    canvas = createCanvas(600,300);
    // createDiv().addClass('decimal');
    // div = select('.decimal')
    // ph = createP().parent(div);
    // pm = createP().parent(div);
    // ps = createP().parent(div);
    // canvas.center();

    bgc = color(249,30,10,1);
    select('body').style('background-color', bgc);

    k = 0;
    for (let j = 0; j < 3; j += 1) { //rows
        for (let i = 0; i < 6; i += 1) { //cols
          b = new Bulb(i, j);
          grid.push(b);
          k++;
        }
    } 
}

function draw() {
    background(249,30,10,1);

  //hours
  let h = hour();
  let dh = h +  ':';
  for (let i = 0; i < 6; i += 1) {
    h = grid[i].isActive(h);
    grid[i].show();
  }

  //minutes
  let m = minute();
  let dm = m +  ':';
  for (let i = 6; i < 12; i += 1) {
    m = grid[i].isActive(m);
    grid[i].show();
  }

  //seconds
  let s = second();
  for (let i = 12; i < 18; i += 1) {
    s = grid[i].isActive(s);
    grid[i].show();
  }

  //decimal time for debug.
//   ph.html(dh, false);  
//   pm.html(dm, false);  
//   ps.html(s, false);
}
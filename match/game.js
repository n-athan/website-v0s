let grid = [];
let selected = [];
let delArr = [];
let scale;
let cols = 15;
let rows;
let minLine = 3;
let minRect = 2;
let looping = false;
let alph = 1;
let score = 0;
let canvas_size;
let hoverIndex = 0;


function getSize() {
  if (window.innerWidth < 450) {
      canvas_size = 400;
  } else if (window.innerWidth < 900) {
      let w_col = window.innerWidth * 0.7;
      if (w_col > window.innerHeight) {
          canvas_size = window.innerHeight - 250;
           
      } else {canvas_size = Math.floor(w_col)}
  } else {
      let w_col = document.getElementById("controls").offsetWidth;
      if (w_col > window.innerHeight) {
          canvas_size = window.innerHeight - 50
           
      } else {canvas_size = Math.floor(w_col)}
  }
}

function setup() {
  getSize();
  createCanvas(canvas_size+1, canvas_size+1);
  colorMode(HSL, 360, 100, 100);
  rows = cols;
  scale = width/cols;
  for (let i = 0; i < rows * cols; i++) {
    blok = new Blok();
    grid.push(blok);
  }
  scan();
}

function draw() {
  background(0,0,50);

  //fade out deleted blocks
  for (let d = 0; d < delArr.length; d++) {
    grid[delArr[d]].color[0].setAlpha(alph);
  }
  alph -= 0.05;

  //show blocks
  for (let i in grid) {
    let x = (i % cols) * scale;
    let y = floor(i / cols) * scale;
    grid[i].show(x, y);
  }

  //show selection 
  if (mouseIsPressed) {
    //mouse coordinaten to index
    let gridIndex = floor((mouseX / scale) % cols) + (floor(mouseY / scale) * cols);
    if (gridIndex != hoverIndex) {
      grid[gridIndex].hover = true;
      grid[hoverIndex].hover = false;
      hoverIndex = gridIndex;
    }
  }

  //only draw after change on field, or during removal.
  if (looping) {
    loop();
  } else {
    noLoop();
  }
}



//Mouse interactions
function mouseReleased() {
    looping = true;
    mouseAction();
}

function mousePressed() {
    looping = true;
    mouseAction();
}

function mouseAction() {
  if (mouseX > 0 && mouseX < width &&
    mouseY > 0 && mouseY < height) {
    //mouse coordinaten to index
    let gridIndex = floor((mouseX / scale) % cols) + (floor(mouseY / scale) * cols);
    grid[gridIndex].hover = false;
    //select blok
    toggleSelect(gridIndex);
    //if 2 blocks selected, swap them
    if (selected.length == 2) {
      swap(selected);
    }
  } else {
    clearSelect();
  }
  draw();
}

function swap(array,unswap) {
   
  array.sort((a, b) => a - b);
  if ((array[0]+1 == array[1]) || (array[0]+cols == array[1])) {
    let a = grid[array[0]];
    let b = grid[array[1]];
    grid[array[0]] = b;
    grid[array[1]] = a;
  }
  if (!unswap) {
    scan(true,selected);
  }
  clearSelect();
}

function toggleSelect(index) {
  if (grid[index].selected) { //unselect
    grid[index].selected = false;
    let i = selected.indexOf(index);
    selected.splice(i,1);
  } else { //select
    grid[index].selected = true;
    selected.push(index);
  }
}

function clearSelect() {
    for (let i = selected.length-1; i >= 0; i--){
    grid[selected[i]].selected = false;
    selected.splice(i,1);
  }
}
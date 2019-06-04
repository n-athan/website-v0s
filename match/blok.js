class Blok {
	
  constructor() {
    this.color = randomColor();
    this.selected = false;
    this.hover = false;
  }	
  
  show(x,y) {    
    noStroke();
    if (this.selected) {
      stroke(0,0,50);
      strokeWeight(2);
    } else if (this.hover) {
      stroke(30,100,50);
      strokeWeight(2);
    }
    fill(this.color[0]);
    rect(x,y,ceil(scale),ceil(scale));
  }
}

function randomColor() {
  const i = random(1);
  var c, stringC;
  if (i < 0.125) {
    c = color(0,100,40); //red
    stringC = "red";
  } else if (i < 0.25) {
    c = color(50,100,60); //yellow
    stringC = "yellow";
  } else if (i < 0.375) {
    c = color(220,100,40); //blue
    stringC = "blue";
  } else if (i < 0.80) {
    c = color(0,0,100); //white
    stringC = "white";
  } else {
    c = color(0,100,0); //black
    stringC = "black";
  }
  return [c,stringC];
}

function scan(justSwapped,selected) {
   
  let sel = selected;
  stopFade();
  let rd = []; 
  let blu = []; 
  let yel = []; 
  let blk = []; 
  let wht = []; 
  delArr = [];
  for (let i = 0; i < grid.length; i ++) {
    let b = grid[i];
    if (b.color[1] == "red") {
      rd.push(i);
    } else if (b.color[1] == "blue") {
      blu.push(i);
    } else if (b.color[1] == "yellow") {
      yel.push(i);
    } else if (b.color[1] == "white") {
      wht.push(i);
    } else if (b.color[1] == "black") {
      blk.push(i);
    } else {}
  }
  
  let clrs = [rd,blu,yel,wht,blk];
  for (let c = 0; c < clrs.length; c++) {    
    orderedGrid = orderGrid(clrs[c]);
    if (c != 3) { //white and black
      getLines(orderedGrid[0],1);
      getLines(orderedGrid[1],cols);
    }else { //white, red, blue and yellow
      getRects(orderedGrid[0]);
    }
  }
  
  if (delArr.length > 0) { //no check leads to infinite loop.
    removeBlocks(delArr);
  } else if (justSwapped) { //no match, illigal swap.
    swap(sel,true); 
  }
}

function orderGrid(colorArr) {
   
  let vert = new Array(cols);
  let horz = new Array(rows);
  for (let j = 0; j < colorArr.length; j ++) {
    let jv = colorArr[j]; 
    //horizontal check
    //nested array of all blocks of $color in row
    let n = floor(jv/cols);
    if (!(horz[n])) {horz[n] = [jv];}
    else {horz[n].push(jv);}  
    //vertical check
    //nested array of all blocks of $color in column
    let m = jv%cols;
    if (!(vert[m])) {vert[m] = [jv];}
    else {vert[m].push(jv);}    
  }   
  return [horz,vert];
}

function getLines(arr,diff) {
   
  let temp = [];
  for(let i = 0; i < arr.length; i++){
    let m = arr[i];
    if (m && m.length >= minLine) {
      for (let n = 0; n < m.length; n ++) {
        if (m.indexOf(m[n]+diff) > 0) {
          temp.push(m[n]);
        } else if (temp.length >= minLine-1) {
          temp.push(m[n]);
          score += temp.length;
          delArr = delArr.concat(temp); 
          temp = [];
        } else if (temp.length < minLine) {        
          temp = [];
        }
      }
    } 
  }
}

function getRects(horz) {
   
  let temp = [];
  for(let i = 0; i < horz.length-1; i++){
    let m = horz[i];
    let m1 = horz[i+1];
    if (m && m1 && m.length >= minRect && m1.length >= minRect) {
      for (let n = 0; n < m.length; n ++) {
        if (m.indexOf(m[n]+1) >= 0 && m1.indexOf(m[n]+cols) >= 0
           && m1.indexOf(m[n]+cols+1)>=0) { //right, under, under/right
          temp.push(m[n],m[n]+1,m[n]+cols,m[n]+cols+1);
          delArr = delArr.concat(temp); 
          score += temp.length;
          temp = []; 
        }
      }
    } 
  }
}



function removeBlocks(delArr) {
   
  looping = true;
  let deleteArr = [... new Set(delArr)]; //ES6 removes duplicates.
  let delCols = [];
  for (let j = 0; j < deleteArr.length; j++){
    //sort into colums 
    let m = deleteArr[j]%cols;
    if (!(delCols[m])) {delCols[m] = [deleteArr[j]];}
    else {delCols[m].push(deleteArr[j]);}
    delCols[m].sort((a,b) => (b-a));    
  } 
    setTimeout(function() {    
    //new positions
    for (let d = 0; d < cols; d++) {
      if (delCols[d]){
        moveDown(delCols[d]);
      }
    }},600);  
  
  setTimeout(function() {
    // iterate
    looping = false;
    draw();
    scan();},700);
}

function moveDown(arr){
   
  for (let i = 0; i < arr.length; i ++) {
    for (let j = 0; j < rows; j ++) {
      if (arr[0]-j*cols < cols) { //top
        grid[arr[0]-j*cols] = new Blok();
        j = rows;
      } else {
        grid[arr[0]-j*cols] = grid[arr[0]-(j+1)*cols];
      }
    }
  }
}

function stopFade() {
  alph = 1;
  for(let i = 0; i < grid.length; i ++){
    grid[i].color[0].setAlpha(1);
  }
}
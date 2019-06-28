let grid = [];
let selected = [];
let delArr = [];
let scale,cols,rows,minLine,minRect,looping,alph,score,multiplier,hoverIndex,movesLeft,gameMode,end,text,a,highscore;

function getSize() {
  let canvas_size;
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
  return canvas_size;
}

function setup() {
  let canvas_size = getSize();
  createCanvas(canvas_size, canvas_size);
  colorMode(HSL, 360, 100, 100);

  //set variables
  cols = floor(select('#cols').value());
  if ((cols < 3 || cols > 40)) {
    alert("Number of colums must be between 3 and 40. Number set to 15.");
    cols = 15;
    select('#cols').value(15);
  }
  rows = cols;
  scale = width/cols;
  minLine = 3;
  minRect = 2;
  looping = false;
  alph = 1;
  a = 0;
  score = 0;
  multiplier = 0;
  hoverIndex = 0;
  movesLeft = 20;
  gameMode = document.querySelectorAll('input[name="gameMode"]:checked')[0].value;

  //get Highscore
  highscore = window.localStorage.getItem("match");
  highscore = JSON.parse(highscore);
  if (highscore == undefined) {
    highscore = {};
  }
 
  //fill board with blocks 
  for (let i = 0; i < rows * cols; i++) {
    blok = new Blok();
    grid.push(blok);     
  }

  if (gameMode == 'competative') {
    select('#scoreP').html('Score: ' + score);
    select('#movesLeftP').html('Moves: ' + movesLeft);
    highscoreT = "<table>"+
      "<tr class='en'><td>Columns</td><td>Highscore</td></tr>" +
      "<tr class='nl'><td>Kolommen</td><td>Highscore</td></tr>"
      for (let i in highscore) {
        highscoreT += "<tr><td>"+i+"</td><td>"+highscore[i]+"</td></tr>"
      }
      highscoreT += "</table>"  
    select('#highScoreP').html(highscoreT);
  }

  noMobileScroll();
  scan();
}

function draw() {
  background(0,0,50);
  if (gameMode == 'competative') {
  select('#movesLeftP').html('Moves: ' + movesLeft);  
  select('#scoreP').html('Score: ' + score);
  }

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
  if (mouseIsPressed && grid.length > 0) {
    //mouse coordinaten to index
    let gridIndex = floor((mouseX / scale) % cols) + (floor(mouseY / scale) * cols);
    if (gridIndex != hoverIndex) {
      grid[gridIndex].hover = true;
      grid[hoverIndex].hover = false;
      hoverIndex = gridIndex;
    }
  }

  if (movesLeft == 0 && gameMode == 'competative' && delArr.length == 0) {
    endGame();
  }

  if (end) {
    a += 0.01;
    end.background(color(267,100,38,a));   
    end.text(text,width/2,height/2);
    image(end,0,0);
  }

  //only run draw() after change on board, or during removal (for fade out).
  if (looping) {
    loop();
  } else {
    noLoop(); //save some cpu by not drawing all the time.
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
  if (delArr.length == 0) { //only allow mouse actions when nothing is happening on the board. 
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
}

function swap(array,unswap) {
  multiplier = 0;    
  movesLeft --;
  array.sort((a, b) => a - b);
  if ((array[0]+1 == array[1]) || (array[0]+cols == array[1])) {   
    let a = grid[array[0]];
    let b = grid[array[1]];
    grid[array[0]] = b;
    grid[array[1]] = a;
  }
  if (!unswap) {
    scan(true,selected);
  } else {    
    movesLeft += 2;
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

// game functions
function endGame() { 
  let b = cols.toString();
  let oldScore = highscore[b];
  if (oldScore) {
    if (score > oldScore) {
      highscore[b] = score;
    }
  } else {highscore[b] = score;}  
  endScreen(oldScore);
  console.log(highscore);
  window.localStorage.setItem("match", JSON.stringify(highscore));
  setTimeout(function(){end = undefined; refresh(); },3000);
}

function endScreen(highScore) {
  end = createGraphics(width,height);
  end.colorMode(HSL,360,100,100,1);
  end.background(color(267,100,38,0));
  end.textAlign(CENTER);
  end.fill(249, 30, 10);
  text = 'Score: ' + score; 
  if (score > highScore || !highScore) {
    text += '\n New Highscore!'
  }
  end.textFont('Space Mono');
  end.textSize(scale);
  end.textStyle(BOLD);
  end.text(text,width/2,height/2);
  looping = true;
  movesLeft = '-'
  draw();
}

function refresh() {
  console.log('refresh')
  noLoop();
  grid = [];
  selected = [];
  delArr = [];
  select('#movesLeftP').html('');
  select('#scoreP').html('Score: 0');
  setup();
}

function windowResized() {
  let canvas_size = getSize();
  resizeCanvas(canvas_size, canvas_size);  
  scale = width/cols;
  draw();
}

function noMobileScroll() {
  let fixed = document.getElementById('defaultCanvas0');
    fixed.addEventListener('touchmove', function(e) {
      e.preventDefault();
    }, false)
}

//Class Blok
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
  multiplier ++;
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
          score += temp.length*multiplier;
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
          score += temp.length*multiplier;
          temp = []; 
        }
      }
    } 
  }
}



function removeBlocks(delArr) {
  looping = true;
  draw();
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
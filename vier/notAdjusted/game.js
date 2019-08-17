
let c,r,a;
let q;
let score;
let morelines, fourlines, threelines, twolines, oneline;
let gameOver;
let pauze;

function preload() {
  hit = loadSound("tetrisSounds\\hit.mp3"); 
}

function setup() {
    scl = 25;
    cols = floor(select('#cols').value());
    if ((cols < 3 || cols > 40)) {
        alert("Number of colums must be between 3 and 40. Number set to 15.");
        cols = 15;
        select('#cols').value(15);
    }
    rows = floor(select('#rows').value());
    if ((rows < 3 || rows > 40)) {
        alert("Number of rows must be between 3 and 40. Number set to 15.");
        rows = 15;
        select('#rows').value(15);
    }
    w = cols*scl;
    h = rows*scl;

    createCanvas(w,h);
    colorMode(HSL,360,100,100,1);
    rectMode(CORNER);
    grid = [];    
    s = 20;
    c = floor(width/scl);
    r = floor(height/scl);
    q = new Quatra();  
    score = 0;
    gameOver = false;
    pauze = false;


    let k =0;
    for (let i = 0; i < r; i++) {
        for (let j = 0; j < c; j++) {
            grid[k] = [0,0,0,0];
            k++
        }
    }

    //get Highscore
    highscore = window.localStorage.getItem("vier");
    highscore = JSON.parse(highscore);
    if (highscore == undefined) {
        highscore = {};
    }
    //score
    select('#scoreP').html('Score: ' + score);
    highscoreT = "<table>"+
      "<tr class='en'><td>ColumnsxRows</td><td>Highscore</td></tr>" +
      "<tr class='nl'><td>KolommenxRijen</td><td>Highscore</td></tr>"
      for (let i in highscore) {
        highscoreT += "<tr><td>"+i+"</td><td>"+highscore[i]+"</td></tr>"
      }
      highscoreT += "</table>"  
    select('#highScoreP').html(highscoreT);

    
    document.getElementById('defaultCanvas0').focus()
    
    hit.setVolume(0.1);
    morelines = loadSound('tetrisSounds\\moreLines.mp3'); 
    fourlines = loadSound('tetrisSounds\\4lines.mp3'); 
    threelines = loadSound('tetrisSounds\\3lines.mp3'); 
    twolines = loadSound('tetrisSounds\\2lines.mp3'); 
    oneline = loadSound('tetrisSounds\\1line.mp3'); 
}

function draw() {
	background(30,10,60,1);
    select('#scoreP').html('Score: ' + score);
	noStroke();
	  
	let k = 0;
	for (let i = 0; i < r; i++) {
	  for (let j = 0; j < c; j++) {
	    fill(grid[k][0],grid[k][1],grid[k][2],grid[k][3]);
	    k++;
	    rect(j*scl,i*scl,scl,scl); 
	  }
	}
	
	
	removeLine();
	
	if(!gameOver){        
	isGameOver();
	  q.show();
	  q.update();
    } else if (end) {
        a += 0.01;
        end.background(color(267,100,38,a));   
        end.text(text,width/2,height/2);
        image(end,0,0);
    }
}

function keyPressed() {
	if (keyCode === UP_ARROW) {
	  q.rotLeft();
	} else if (keyCode === DOWN_ARROW) {
	  q.rotRight();
	} else if (keyCode === LEFT_ARROW) {
	  q.move(-1);
	} else if (keyCode === RIGHT_ARROW) {
	  q.move(1);
	} else if (keyCode === 32) { //spacebar
	  q.moveDown();
	} else if (keyCode === 27) {
        if (!pauze) {
            noLoop();
        } else {loop()}
        pauze = !pauze;
        
    }
}

function removeLine() {
	let lines = 0;
	for (let i = r-1; i >= 0; i--) {
	  let blockCounter = 0;
	  for (let j = 0; j < c; j++) { 
	    if (alpha(grid[i*c+j]) == 0) {
	      j += c+1
	    } else if (alpha(grid[i*c+j]) > 0) {
	      blockCounter += 1;
	      if (blockCounter == c){
	        score += c;
	        lines += 1;
	        for (let y = i; y > 0; y--) {
	          for (let x = 0; x < c; x++) {
	            grid[y*c+x] = grid[(y-1)*c+x]
	          }
	        }
	        checkSpeed();
	      }
	    }
	  }
	}
	playSound(lines);
}

function checkSpeed() {
	if(score > 0 && score%(c*5) == 0) {
	  s -= 1;
	  constrain(s,0,100);
	}
}

function playSound(lines) {
	if (lines >= 5) {
	    morelines.play();
	} else if (lines == 4) {
	    fourlines.play();
	} else if (lines == 3) {
	    threelines.play();
	} else if (lines == 2) {
	    twolines.play();
	} else if (lines == 1) {
	    oneline.play();
	}
}

function isGameOver() {
	for (let i = 0; i <= c; i++) {
	   if (alpha(grid[i]) > 0) {
	     console.log('game over');
         gameOver = true;
         endGame();
	   }
	}
	
}

//Interface
function refresh() {
	  console.log('refresh')
	  select('#scoreP').html('Score: 0');
	  setup();
    }

function endGame() { 
    let b = cols.toString() + "x" + rows.toString();
    let oldScore = highscore[b];
    if (oldScore) {
        if (score > oldScore) {
        highscore[b] = score;
        }
    } else {highscore[b] = score;}  
    endScreen(oldScore);
    console.log(highscore);
    window.localStorage.setItem("vier", JSON.stringify(highscore));
    setTimeout(function(){end = undefined; refresh(); },3000);
    }
    
function endScreen(highScore) {
    a = 0;
    end = createGraphics(width,height);
    end.colorMode(HSL,360,100,100,1);
    end.background(color(267,100,38,0));
    end.textAlign(CENTER);
    end.fill(249, 30, 10, 1);
    text = 'Score: ' + score; 
    if (score > highScore || !highScore) {
        text += '\n New Highscore!'
    }
    end.textFont('Space Mono');
    end.textSize(scl);
    end.textStyle(BOLD);
    end.text(text,width/2,height/2);
    movesLeft = '-'
}

//Quatra Class
shapes = [[
	  [0, 0, 0, 0],
	  [0, 1, 0, 0],
	  [1, 1, 1, 0],
	  [0, 0, 0, 0]
	],
	     [
	  [0, 0, 0, 0],
	  [0, 1, 1, 0],
	  [0, 1, 1, 0],
	  [0, 0, 0, 0]
	],
	     [
	  [0, 0, 0, 0],
	  [0, 0, 0, 0],
	  [1, 1, 1, 1],
	  [0, 0, 0, 0]
	],
	     [
	  [0, 0, 0, 0],
	  [1, 1, 0, 0],
	  [0, 1, 1, 0],
	  [0, 0, 0, 0]
	],
	     [
	  [0, 0, 0, 0],
	  [0, 0, 1, 1],
	  [0, 1, 1, 0],
	  [0, 0, 0, 0]
	],
	     [
	  [0, 0, 0, 0],
	  [1, 0, 0, 0],
	  [1, 1, 1, 0],
	  [0, 0, 0, 0]
	],
	     [
	  [0, 0, 0, 0],
	  [0, 0, 1, 0],
	  [1, 1, 1, 0],
	  [0, 0, 0, 0]
	]]

colors = [50,220,10,'g','w','g','w']


class Quatra {

constructor() {
	this.i = -2;
	this.j = floor(c / 2 - 2);
	// this.s = floor(random(0,7));  
	this.r = floor(random(0,7));    
	this.shape = shapes[this.r];  
	if (colors[this.r] == 'g') {
	  this.clr = color(10,10,10,1);
	} else if (colors[this.r] == 'w') {
	  this.clr = color(0,0,100,1);
	} else {
	  this.clr = color(colors[this.r],90,50,1);
	} 
	this.speed = s;
	this.speedcounter = 0;
}

show() {
	fill(this.clr);
	noStroke();
	for (let i = 0; i < 4; i++) {
	  for (let j = 0; j < 4; j++) {
	    if (this.shape[i][j] == 1) {
	      rect((this.j + j) * scl, (this.i + i) * scl, scl, scl);
	    }
	  }
	}
}

update() {
	if(this.speedcounter == this.speed) {
	this.i += 1;
	this.stopMoving('vert',1);
	this.speedcounter = 0;
	}
	this.speedcounter ++;
}

stopMoving(dir,vel){
	if (this.hasHit()) {      
	  hit.play();
	  if (dir == 'vert') {this.i -= vel};
	  for (let i = 0; i < 4; i++) {
	    for (let j = 0; j < 4; j++) {
	      let indi = this.i + i;
	      let indj = this.j + j;
	      let index = indi * c + indj;
	      if (this.shape[i][j] == 1) {
	        grid[index] = [hue(this.clr),
	                       saturation(this.clr),
	                       lightness(this.clr),
	                       alpha(this.clr)];
	      }
	    }
	  }
	  q = new Quatra(); 
	  return true;
	} 
}

rotLeft() {
	let newShape = [
	  [],
	  [],
	  [],
	  []
	];
	for (let i = 0; i < 4; i++) {
	  for (let j = 0; j < 4; j++) {
	    newShape[j][i] = this.shape[i][3 - j];
	  }
	}
	this.shape = newShape;
	let mx = this.getMax();
	if (this.j + mx[0] >= c-1) {
	    this.j -= 1;
	} else if (this.j + mx[2] <= 0) {
	   this.j += 1; 
	}
}

rotRight() {
	let newShape = [
	  [],
	  [],
	  [],
	  []
	];
	for (let i = 0; i < 4; i++) {
	  for (let j = 0; j < 4; j++) {
	    newShape[j][i] = this.shape[3 - i][j];
	  }
	}
	this.shape = newShape;
	let mx = this.getMax();
	if (this.j + mx[0] >= c-1) {
	    this.j -= 1;
	} else if (this.j + mx[2] <= 0) {
	   this.j += 1; 
	}
}



move(m) {
	let mx = this.getMax();
	if (m == 1) {
	  if (this.j + mx[0] >= c-1) {
	    return 
	  } else {
	      this.j += m
	      if (this.hasHit()) {
	        this.j -= m
	      }
	    }
	} else if (m == -1) {
	  if (this.j + mx[2] <= 0) {
	    return 
	  } else {
	      this.j += m
	      if (this.hasHit()) {
	        this.j -= m
	      }
	  }
	}
}
	  
moveDown(){
	let d = this.getDistBottom()
	this.i = this.i + d;
}
	  
getMax() {
	let left = 4;
	let right = -1;
	let down = 4;
	for (let i = 0; i < 4; i++) {
	  for (let j = 0; j < 4; j++) {
	    if(this.shape[i][j] == 1){
	      left = min(left,j);
	      right = max(right,j);
	      down = max(down,i);
	    }
	  }
	}
	return [right,down,left];
}
	  
getDistBottom() {
	let y = this.getMax()
	let d = r-(this.i+y[1]);
	for (let j = y[2]+this.j ; j <= y[0]+this.j; j++) {
	  for (let i = y[1]+this.i ; i < r ; i++) {  
	    if(alpha(grid[i*c+j]) > 0) {
	      d = min(d,(i-(y[1]+this.i)));
	    }
	  }
	}
return d;    
}

hasHit() {
	for (let i = 0; i < 4; i++) {
	  for (let j = 0; j < 4; j++) {
	    if(this.shape[i][j] == 1){
	      let index = (this.i + i)*c + this.j + j;
	      if (index < 0) {
	        //do nothing
	      }else if (index > c*r-1){
	           return true; 
	      } else if (alpha(grid[index]) > 0) {
	          return true;
	      }
	    }
	  }
	}    
	return false; 
}  

}
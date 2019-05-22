let spinners = [];
let sliders;
let block = document.getElementById("colorBlock");

function setup() {
  createCanvas(innerWidth,innerHeight);  
  colorMode(HSL,360,100,100,1);	
  angleMode(DEGREES);
  //interface setup
  sliders = selectAll('.slider');
	showInterface();

  // create first spinner
    newSpinner();
}

function draw() {  
  //dark blue background with slight blur for movement.
  background(249, 30, 10, 0.7);

  // drawing spinners
  for (let i = 0; i < spinners.length; i++){
  spinners[i].show(); 
  }
  
  // rotation of spinners
  for (let i = 0; i < spinners.length; i++){
  spinners[i].update(); 
  }

  let hue = sliders[0].value();
	let sat = sliders[1].value();
	let brg = sliders[2].value();
  block.style = 'background-color: hsl('+hue+', '+sat+'%, '+brg+'%);';
}

//start moving spinner
function mousePressed() {  
  for (let i = 0; i < spinners.length; i++){
    spinners[i].move(mouseX,mouseY); 
  }
}

//stop moving spinner and give it max speed. 
function mouseReleased() {  
  for (let i = 0; i < spinners.length; i++){
    spinners[i].start(mouseX,mouseY);
    spinners[i].moving = false; 
  }
}

//Create a new spinner with user input.
function newSpinner() {
  let hue = sliders[0].value();
	let sat = sliders[1].value();
	let brg = sliders[2].value();
  let clr = color(hue,sat,brg);
  let size = select('#size').value();
  let arms = select('#arms').value();

  spinner = new Spinner(clr,arms,size);
  spinners.push(spinner);
  
  //smallest spinner on top
  spinners.sort((a,b) => b.rCenter - a.rCenter);
}

//remove spinner on doubleclick- not compatible on most browsers yet.
window.addEventListener('dblclick', doubleClicked());
function doubleClicked() {
  for (let i = 0; i < spinners.length; i++){
    let sp = spinners[i];
    let d = dist(sp.x,sp.y,mouseX,mouseY);
    if (d < (sp.rCenter)/2) {
      spinners.splice(i,1);
    }
  } 
} 


//Interface funtionality
function showInterface() {
	let i = select('#settingsInterface');
	i.style('top', '2em');
}

function hideInterface() {
	let i = select('#settingsInterface');
	i.style('top', '-450px' );
}

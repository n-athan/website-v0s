let maxLength;

function setup() {
	colorMode(HSB, 360, 100, 100, 1);
	let w = constrain(window.innerWidth, 100, 800)
	let h2 = constrain(window.innerHeight, 100, 800)
	createCanvas(w, h2);
	// createCanvas(window.innerWidth, window.innerHeight);
	maxLength = dist(0, 0, width, height);
	frameRate(3);
	angleMode(DEGREES);
}

function draw() {
	background(0, 0, 100, 1);
	strokeWeight(8);

	//hour
	let h = map(hour(), 0, 24, 0, 90);
	stroke(60, 100, 80);
	line(0, 0, maxLength * cos(h), maxLength * sin(h));

	//minute
	let m = map(minute(), 0, 60, 180, 90);
	stroke(0, 100, 80);
	line(width, 0, width + maxLength * cos(m), maxLength * sin(m));

	//sec
	strokeWeight(4);
	let s = map(second(), 0, 60, 0, height);
	stroke(210, 100, 80);
	line(0, s, width, s);

	//	For debugging, because the angles are backwards or something. 
	//  stroke(0,100,80);
	// 	line(width/2,height/2, width/2+10*cos(0), height/2+10*sin(0));	
	// 	stroke(210,100,80);
	// 	point(width/2,height/2);

	//text
	strokeWeight(2);
	stroke(0, 100, 0);
	let t = checkTime(hour()) + ':' + checkTime(minute());
	let ts = 30;
	textSize(ts);
	textFont('Poppins');
	text(t, width - ts * 5, height - ts, width, height);

}

// add a zero in front of numbers<10
function checkTime(i) {
    if (i<10) {
        i="0" + i;
    }
    return i;
}
class Spinner {
	
  constructor(color,arms,size) {
		this.offset = 0;
		this.x = random(width);
		this.y = random(height);
		this.max = random(20,10);
    this.speed = this.max;
		this.slow = 0.01;
		this.color = color;
		this.arms = arms;
    this.mirror_angle = 360/this.arms/2;
    this.size = size;
    this.radius = (PI*this.size)/(this.arms*2);
    this.rCenter = this.size-this.radius;
    this.moving = false;
    this.shape = this.createShape();
	}  
	
	update() {
      if(this.speed > 0) {
        this.speed -= this.slow;
		this.offset += this.speed;	
      }
      if(this.moving == true) {
        this.x = mouseX;
        this.y = mouseY;
      }
	}
  
  createShape() { //creates the shape of the spinner and saves it as an image object.
    let shape = createGraphics(this.size*4,this.size*4);
    shape.colorMode(HSL,360,100,100,1);	
    shape.background(0,0,0,0); //transparant
    // shape.noStroke();
    let c = this.color;
    c.alpha = 1;
    shape.stroke(c);
    shape.strokeWeight(5);
    shape.fill(this.color);
    
    shape.beginShape();
    let counter = 0;
    //start of curve (first vertex is startpoint)
    shape.curveVertex(
      shape.width/2+cos(360)*this.size+cos(90+360)*this.radius,
      shape.height/2+sin(360)*this.size+sin(90+360)*this.radius);
    //curve vertices
    for (let j = 360; j > 0; j -= this.mirror_angle) {      
      let cx = shape.width/2+cos(j)*this.size;
      let cy = shape.height/2+sin(j)*this.size;
      let s = this.radius;
      if (counter%2 == 0){
        for (let k = 90; k >= -90; k -= 5) {
          shape.curveVertex(cx+cos(k+j)*s,cy+sin(k+j)*s);         }
      } else {
        for (let k = 90; k <= 270; k += 5) {
          shape.curveVertex(cx+cos(k+j)*s,cy+sin(k+j)*s);   
        }
      }
      counter++;
    }
    //end of curve is the same as the start of the curve
    shape.curveVertex(
      shape.width/2+cos(360)*this.size+cos(90+360)*this.radius,
      shape.height/2+sin(360)*this.size+sin(90+360)*this.radius);
    shape.endShape(CLOSE);

    //center disk.
    shape.fill(0,0,0);
    shape.ellipse(shape.width/2,shape.height/2,this.rCenter,this.rCenter);
    
    return shape;
  }
  
  show() {
    push();
    translate(this.x,this.y);
    rotate(this.offset);
    image(this.shape,-this.shape.width/2,-this.shape.height/2);
    pop();    
  }
      
  move(x,y) {
    let d = dist(this.x,this.y,x,y);
    if (d < this.rCenter/2) {
      this.moving = true;
    }
  }
  
  start(x,y) {
    let d = dist(this.x,this.y,x,y);
    if (d < this.rCenter/2) {
      this.speed = this.max;
    }
  }

}
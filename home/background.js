var canvas = document.querySelector("canvas");
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');

//center
cx = width/2;
cy = height/2;

r = 300;
rh = 100;
hue = 0;
var f = -Math.PI/4;
var fh = 0;

function arm(cx,cy,r, f) {
    var x_ = cx + Math.cos(f) * r;
    var y_ = cy + Math.sin(f) * r;
    return {
        x: x_,
        y: y_
    };
}

function hand() {
    var a = arm(cx,cy,r,f);
    var x_ = a.x + Math.cos(fh) * rh;
    var y_ = a.y + Math.sin(fh) * rh;
    return {
        x: x_,
        y: y_
    };
}
function drawHand() {
    var h = hand();
    ctx.beginPath(); 
    ctx.arc(h.x, h.y, 2, 0, 2 * Math.PI, true); 
    ctx.fillStyle = `hsla(${hue},50%,50%,0.5)`;
    ctx.fill();    
}

function animate() {
    var s = 0;
    interval = setInterval(function() {
        repeat();
        s++;
        if (s > 350) clearInterval(interval);
        if (s > 350) {
            var interval2 = setInterval(function() {
                repeat();
            }, 30);
    }}, 5);
}
function repeat(){
    drawHand();
    hue ++;
    if (f === 0){
        f += 0.001;
    }
    f += 1.6241/Math.PI;
    fh += Math.PI/200;
}
animate();

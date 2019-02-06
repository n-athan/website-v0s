// function to make random integer in range
const rnd = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
// create a random color in hsl
function base(h,s,l) {
    return(`hsl(${h},${s}%,${l}%)`);
};

window.addEventListener('resize', () => { 
    var grid = document.getElementsByTagName("main")[0];
    grid.innerHTML = '';
    var w = window.innerWidth;
    var hg = window.innerHeight; 
    fill(w,hg);
 });

function fill(width,height) {
    col = Math.floor(width/40) - 1;
    row = Math.floor(height/40) - 1;
    var i = 0;
    var num = (col * row) - 1;
    var grid = document.getElementsByTagName("main")[0];
    var column = `repeat(${col}, 40px)`
    grid.style.gridTemplateColumns = column;
    while (i <= num) {
        var h = rnd(0,360);
        var s = rnd(0,100);
        var l = rnd(0,100);
        grid.insertAdjacentHTML('beforeend',`<div class="block" style="background-color: ${base(h,s,l)}; border-color: ${base(h,s,(l-20))};"><div class="shadow"><div class="circle" style="background-color: ${base(h,s,l+10)};color: ${base(h,s,l)} "><i>html</i></div></div></div>`);
        i = i + 1;
    };
};  
var w = window.innerWidth;
var hg = window.innerHeight; 
fill(w,hg);
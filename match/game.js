function _toConsumableArray(arr){return _arrayWithoutHoles(arr)||_iterableToArray(arr)||_nonIterableSpread()}
function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}
function _iterableToArray(iter){if(Symbol.iterator in Object(iter)||Object.prototype.toString.call(iter)==="[object Arguments]")return Array.from(iter)}
function _arrayWithoutHoles(arr){if(Array.isArray(arr)){for(var i=0,arr2=new Array(arr.length);i<arr.length;i++){arr2[i]=arr[i]}return arr2}}
function _instanceof(left,right){if(right!=null&&typeof Symbol!=="undefined"&&right[Symbol.hasInstance]){return right[Symbol.hasInstance](left)}else{return left instanceof right}}
function _classCallCheck(instance,Constructor){if(!_instanceof(instance,Constructor)){throw new TypeError("Cannot call a class as a function")}}
function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1;descriptor.configurable=!0;if("value" in descriptor)descriptor.writable=!0;Object.defineProperty(target,descriptor.key,descriptor)}}
function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor}
var grid=[];var selected=[];var delArr=[];var scale,cols,rows,minLine,minRect,looping,alph,score,multiplier,hoverIndex,movesLeft,gameMode,end,text,a,highscore;function getSize(){var canvas_size;if(window.innerWidth<450){canvas_size=400}else if(window.innerWidth<900){var w_col=window.innerWidth*0.7;if(w_col>window.innerHeight){canvas_size=window.innerHeight-250}else{canvas_size=Math.floor(w_col)}}else{var _w_col=document.getElementById("controls").offsetWidth;if(_w_col>window.innerHeight){canvas_size=window.innerHeight-50}else{canvas_size=Math.floor(_w_col)}}
return canvas_size}
function setup(){var canvas_size=getSize();createCanvas(canvas_size,canvas_size);colorMode(HSL,360,100,100);cols=floor(select('#cols').value());if(cols<3||cols>40){alert("Number of colums must be between 3 and 40. Number set to 15.");cols=15;select('#cols').value(15)}
rows=cols;scale=width/cols;minLine=3;minRect=2;looping=!1;alph=1;a=0;score=0;multiplier=0;hoverIndex=0;movesLeft=20;gameMode=document.querySelectorAll('input[name="gameMode"]:checked')[0].value;highscore=window.localStorage.getItem("match");highscore=JSON.parse(highscore);if(highscore==undefined){highscore={}}
for(var i=0;i<rows*cols;i++){blok=new Blok();grid.push(blok)}
if(gameMode=='competative'){select('#scoreP').html('Score: '+score);select('#movesLeftP').html('Moves: '+movesLeft);highscoreT="<table>"+"<tr class='en'><td>Columns</td><td>Highscore</td></tr>"+"<tr class='nl'><td>Kolommen</td><td>Highscore</td></tr>";for(var _i in highscore){highscoreT+="<tr><td>"+_i+"</td><td>"+highscore[_i]+"</td></tr>"}
highscoreT+="</table>";select('#highScoreP').html(highscoreT)}
noMobileScroll();scan()}
function draw(){background(0,0,50);if(gameMode=='competative'){select('#movesLeftP').html('Moves: '+movesLeft);select('#scoreP').html('Score: '+score)}
for(var d=0;d<delArr.length;d++){grid[delArr[d]].color[0].setAlpha(alph)}
alph-=0.05;for(var i in grid){var x=i%cols*scale;var y=floor(i/cols)*scale;grid[i].show(x,y)}
if(mouseIsPressed&&grid.length>0){var gridIndex=floor(mouseX/scale%cols)+floor(mouseY/scale)*cols;if(gridIndex!=hoverIndex){grid[gridIndex].hover=!0;grid[hoverIndex].hover=!1;hoverIndex=gridIndex}}
if(movesLeft==0&&gameMode=='competative'&&delArr.length==0){endGame()}
if(end){a+=0.01;end.background(color(267,100,38,a));end.text(text,width/2,height/2);image(end,0,0)}
if(looping){loop()}else{noLoop()}}
function mouseReleased(){looping=!0;mouseAction()}
function mousePressed(){looping=!0;mouseAction()}
function mouseAction(){if(delArr.length==0){if(mouseX>0&&mouseX<width&&mouseY>0&&mouseY<height){var gridIndex=floor(mouseX/scale%cols)+floor(mouseY/scale)*cols;grid[gridIndex].hover=!1;toggleSelect(gridIndex);if(selected.length==2){swap(selected)}}else{clearSelect()}
draw()}}
function swap(array,unswap){multiplier=0;movesLeft--;array.sort(function(a,b){return a-b});if(array[0]+1==array[1]||array[0]+cols==array[1]){var _a=grid[array[0]];var b=grid[array[1]];grid[array[0]]=b;grid[array[1]]=_a}
if(!unswap){scan(!0,selected)}else{movesLeft+=2}
clearSelect()}
function toggleSelect(index){if(grid[index].selected){grid[index].selected=!1;var i=selected.indexOf(index);selected.splice(i,1)}else{grid[index].selected=!0;selected.push(index)}}
function clearSelect(){for(var i=selected.length-1;i>=0;i--){grid[selected[i]].selected=!1;selected.splice(i,1)}}
function endGame(){var b=cols.toString();var oldScore=highscore[b];if(oldScore){if(score>oldScore){highscore[b]=score}}else{highscore[b]=score}
endScreen(oldScore);console.log(highscore);window.localStorage.setItem("match",JSON.stringify(highscore));setTimeout(function(){end=undefined;refresh()},3000)}
function endScreen(highScore){end=createGraphics(width,height);end.colorMode(HSL,360,100,100,1);end.background(color(267,100,38,0));end.textAlign(CENTER);end.fill(249,30,10);text='Score: '+score;if(score>highScore||!highScore){text+='\n New Highscore!'}
end.textFont('Space Mono');end.textSize(scale);end.textStyle(BOLD);end.text(text,width/2,height/2);looping=!0;movesLeft='-';draw()}
function refresh(){console.log('refresh');noLoop();grid=[];selected=[];delArr=[];select('#movesLeftP').html('');select('#scoreP').html('Score: 0');setup()}
function windowResized(){var canvas_size=getSize();resizeCanvas(canvas_size,canvas_size);scale=width/cols;draw()}
function noMobileScroll(){var fixed=document.getElementById('defaultCanvas0');fixed.addEventListener('touchmove',function(e){e.preventDefault()},!1)}
var Blok=function(){"use strict";function Blok(){_classCallCheck(this,Blok);this.color=randomColor();this.selected=!1;this.hover=!1}
_createClass(Blok,[{key:"show",value:function show(x,y){noStroke();if(this.selected){stroke(0,0,50);strokeWeight(2)}else if(this.hover){stroke(30,100,50);strokeWeight(2)}
fill(this.color[0]);rect(x,y,ceil(scale),ceil(scale))}}]);return Blok}();function randomColor(){var i=random(1);var c,stringC;if(i<0.125){c=color(0,100,40);stringC="red"}else if(i<0.25){c=color(50,100,60);stringC="yellow"}else if(i<0.375){c=color(220,100,40);stringC="blue"}else if(i<0.80){c=color(0,0,100);stringC="white"}else{c=color(0,100,0);stringC="black"}
return[c,stringC]}
function scan(justSwapped,selected){multiplier++;var sel=selected;stopFade();var rd=[];var blu=[];var yel=[];var blk=[];var wht=[];delArr=[];for(var i=0;i<grid.length;i++){var b=grid[i];if(b.color[1]=="red"){rd.push(i)}else if(b.color[1]=="blue"){blu.push(i)}else if(b.color[1]=="yellow"){yel.push(i)}else if(b.color[1]=="white"){wht.push(i)}else if(b.color[1]=="black"){blk.push(i)}else{}}
var clrs=[rd,blu,yel,wht,blk];for(var c=0;c<clrs.length;c++){orderedGrid=orderGrid(clrs[c]);if(c!=3){getLines(orderedGrid[0],1);getLines(orderedGrid[1],cols)}else{getRects(orderedGrid[0])}}
if(delArr.length>0){removeBlocks(delArr)}else if(justSwapped){swap(sel,!0)}}
function orderGrid(colorArr){var vert=new Array(cols);var horz=new Array(rows);for(var j=0;j<colorArr.length;j++){var jv=colorArr[j];var n=floor(jv/cols);if(!horz[n]){horz[n]=[jv]}else{horz[n].push(jv)}
var m=jv%cols;if(!vert[m]){vert[m]=[jv]}else{vert[m].push(jv)}}
return[horz,vert]}
function getLines(arr,diff){var temp=[];for(var i=0;i<arr.length;i++){var m=arr[i];if(m&&m.length>=minLine){for(var n=0;n<m.length;n++){if(m.indexOf(m[n]+diff)>0){temp.push(m[n])}else if(temp.length>=minLine-1){temp.push(m[n]);score+=temp.length*multiplier;delArr=delArr.concat(temp);temp=[]}else if(temp.length<minLine){temp=[]}}}}}
function getRects(horz){var temp=[];for(var i=0;i<horz.length-1;i++){var m=horz[i];var m1=horz[i+1];if(m&&m1&&m.length>=minRect&&m1.length>=minRect){for(var n=0;n<m.length;n++){if(m.indexOf(m[n]+1)>=0&&m1.indexOf(m[n]+cols)>=0&&m1.indexOf(m[n]+cols+1)>=0){temp.push(m[n],m[n]+1,m[n]+cols,m[n]+cols+1);delArr=delArr.concat(temp);score+=temp.length*multiplier;temp=[]}}}}}
function removeBlocks(delArr){looping=!0;draw();var deleteArr=_toConsumableArray(new Set(delArr));var delCols=[];for(var j=0;j<deleteArr.length;j++){var m=deleteArr[j]%cols;if(!delCols[m]){delCols[m]=[deleteArr[j]]}else{delCols[m].push(deleteArr[j])}
delCols[m].sort(function(a,b){return b-a})}
setTimeout(function(){for(var d=0;d<cols;d++){if(delCols[d]){moveDown(delCols[d])}}},600);setTimeout(function(){looping=!1;draw();scan()},700)}
function moveDown(arr){for(var i=0;i<arr.length;i++){for(var j=0;j<rows;j++){if(arr[0]-j*cols<cols){grid[arr[0]-j*cols]=new Blok();j=rows}else{grid[arr[0]-j*cols]=grid[arr[0]-(j+1)*cols]}}}}
function stopFade(){alph=1;for(var i=0;i<grid.length;i++){grid[i].color[0].setAlpha(1)}}
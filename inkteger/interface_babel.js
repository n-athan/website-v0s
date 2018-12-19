// adjusted to ES5 with https://babeljs.io/en/repl.html

"use strict";

function mousePressed() {
  blocksRevealed = 0;
  for (var i = 0; i < grid.length; i ++)  {
    if (grid[i].contain(mouseX, mouseY)) {
      let rev = grid[i].revealed;
      grid[i].revealed = true;
      if (grid[i].similarNeighbors == 8) {
        grid[i].floodReveal();
      }
      if (paint == undefined) {
        //Free guess
        paintColor(grid[i].hue);
      } else if (paint != grid[i].hue && rev == false) {
        //GAME OVER
        gameOver = true;
      }
    }
    if (grid[i].revealed == true) {
      blocksRevealed += 1;
    }
  }
  if (blocksRevealed == m && gameOver == false) {
    document.getElementsByTagName("canvas")[0].classList.add("gamewon");
  }
}

function paintColor(hue) {
  paint = hue;
  var buttons = document.getElementsByName("paint");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].style.backgroundColor = "hsla(249, 9%, 92%,0.3)";
    buttons[i].style.fontWeight = 400;
  }
  var b = document.getElementById(hue);
  b.style.backgroundColor = "hsla(" + hue + ", 9%, 50%,0.9)";
  b.style.fontWeight = 800;
}

function freeColor() {
  if (guessesLeft > 0) {
    paint = undefined;
    guessesLeft--;
    document.getElementById("free").innerHTML =
      "Free " + guessesLeft + "/" + (colors - 1);
    var buttons = document.getElementsByName("paint");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].style.backgroundColor = "hsla(249, 9%, 92%,0.3)";
      buttons[i].style.fontWeight = 400;
    }
    document.getElementById("free").style.backgroundColor =
      "hsla(60, 9%, 92%,0.9)";
    document.getElementById("free").style.fontWeight = 800;
  } else {
    document.getElementById("free").innerHTML = "-";
  }
}

function refresh() {
  // get user input
  w_input = document.getElementById("squares").value;
  colors_input = document.getElementById("colors").value;
  colors = constrain(colors_input, 2, 12);
  w = canvas_size / constrain(w_input, 1, 30);

  // reset buttons
  document.getElementById("paintButtons").innerHTML = "";

  // start new game
  setup();
}

function changeLanguage() {
  if (lang == "nl") {lang = "en"} else {lang = "nl"};
  let button = document.getElementById("lang");
  let enp = document.getElementsByClassName("en");
  let nlp = document.getElementsByClassName("nl");
  if (lang == "nl") {
      button.innerHTML = "EN";
      for(var i=0; i<nlp.length; i++) {
          nlp[i].style.display = 'block';
      }
      for(var i=0; i<enp.length; i++) {
          enp[i].style.display = 'none';
      }
  } else if (lang == "en") {
      button.innerHTML = "NL";
      for(var i=0; i<nlp.length; i++) {
          nlp[i].style.display = 'none';
      }
      for(var i=0; i<enp.length; i++) {
          enp[i].style.display = 'block';
      }
  }
}

function showInterface() {
    // let m = document.getElementById('mouseArea');
    // m.style.color='transparent';
	let i = document.getElementById('interface');
	i.style.display='block';
}

function hideInterface() {
    // let m = document.getElementById('mouseArea');
    // m.style.color='initial';
	let i = document.getElementById('interface');
	i.style.display='none';
}

let menuHTML = '\
<div id="mouseArea" onmouseover="showInterface()" onmouseout="hideInterface()" tabindex="1">\
        <p id="menu">MENU</p>\
    <div id="interface">\
        <dl>\
            <dt><a href="https://v0s.nl">Home</a></dt>\
            <dt> Bricks\
                <dd><a href="https://v0s.nl/brickify">Brickify</a></dd>\
                <dd><a href="https://editor.p5js.org/full/Hyv8wvBWN">Bricked faces</a></dd>\
                <dd><a href="https://v0s.nl/bricks">Bricks</a></dd>\
            </dt>\
            <dt> Clocks\
                <dd><a href="https://v0s.nl/klok">de klok</a></dd>\
                <dd><a href="https://v0s.nl/klok2">de klok 2.0</a></dd>\
                <dd><a href="https://v0s.nl/binaire%20klok">Binary Clock</a></dd>\
            </dt>\
            <dt> Generative Animations\
                <dd><a href="https://v0s.nl/timestables">The Round Table</a></dd>\
                <dd><a href="https://v0s.nl/flocks">Scenic Flocks</a></dd>\
            </dt>\
            <dt> Games\
                <dd><a href="https://v0s.nl/inkteger">Inkteger</a></dd>\
            </dt>\
            <dt> Miscellaneous\
                <dd><a href="https://v0s.nl/kleuren">Naming Colors</a></dd>\
                <dd><a href="https://v0s.nl/eyes">Vierkante Oogjes</a></dd>\
            </dt>\
        </dl>\
        <div><p style="font-size:0.7rem">license: <a href= "https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA</a></p></div>\
    </div>\
</div>';

let menuCSS = '<link href="https://fonts.googleapis.com/css?family=Space+Mono" rel="stylesheet"> ' +
'<style>' +  
    '#mouseArea {\
        position: fixed;\
        bottom: 0;\
        left: 0;\
        margin: 10px;\
        width: 10vw;\
        height: 10vh;\
        display: flex;\
        align-items: flex-end;\
    }'+
    '#mouseArea > p {background-color: hsla(21, 9%, 92%,0.3);\
        font-family: "Space Mono", monospace !important;\
        font-size: 1rem;\
        text-indent: 0;}' +
    '#interface {\
        position: fixed;\
        bottom:0;\
        left:0;\
        margin-bottom: 3em;\
        margin-left: 10px;\
        padding: 10px;\
        transition: 1s ease all;\
        display: none;  \
        color:  hsla(21, 9%, 92%,0.9);\
        font-family: "Space Mono", monospace;\
        font-size: 1rem;\
        background-color: hsla(249, 30%, 20%,0.9);\
    }' + 
    '#interface >> a {\
        font-weight: bolder;\
    }' + 
    '</style>';

//insert menu styling
let head = document.getElementsByTagName('head')[0];
head.insertAdjacentHTML('beforeend', menuCSS);

//insert menu in html
let h = document.getElementsByTagName('html')[0];
h.insertAdjacentHTML('beforeend', menuHTML);

//TODO make menu tab accessable!
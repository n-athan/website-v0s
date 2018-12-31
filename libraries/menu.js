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
<div id="mouseArea" onmouseover="showInterface()" onmouseout="hideInterface()">\
        <p id="menu">MENU</p>\
    <div id="interface">\
        <dl>\
            <dt>Home</dt>\
            <dt> Bricks\
                <dd>Brickify</dd>\
                <dd>Bricks</dd>\
            </dt>\
            <dt> Clocks\
                <dd>de klok</dd>\
                <dd>de tweede klok</dd>\
                <dd>Binary Clock</dd>\
            </dt>\
            <dt> Generative Animations\
                <dd>The Round Table</dd>\
                <dd>Scenic Flocks</dd>\
            </dt>\
            <dt> Games\
                <dd>Inkteger</dd>\
            </dt>\
        </dl>\
        <div><p>license</p></div>\
    </div>\
</div>';

let menuCSS = '<link href="https://fonts.googleapis.com/css?family=Space+Mono" rel="stylesheet"> ' +
'<style>' +  
    '#mouseArea {\
        position: fixed;\
        bottom: 0;\
        left: 0;\
        margin: 10px;\
        width: 30vw;\
        height: 10vh;\
        z-index: 100;\
        display: flex;\
        align-items: flex-end;\
    }\
    \
    #interface {\
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
    }' + '</style>';

//insert menu styling
let head = document.getElementsByTagName('head')[0];
head.insertAdjacentHTML('beforeend', menuCSS);

//insert menu in html
let h = document.getElementsByTagName('html')[0];
h.insertAdjacentHTML('beforeend', menuHTML);

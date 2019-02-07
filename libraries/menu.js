var MENUOBJECT = function() {

    let menuHTML = '\
    <div id="mouseArea" onmouseover="MENUOBJECT.showInterface()" onmouseout="MENUOBJECT.hideInterface()" tabindex="1">\
            <p id="menu">MENU</p>\
        <div id="interface">\
            <dl>\
                <dt><a href="https://v0s.nl">Home</a></dt>\
                <dt> Bricks\
                    <dd><a href="https://v0s.nl/brickify">Brickify</a></dd>\
                    <dd><a href="https://editor.p5js.org/n-athan/full/SkYgPv6Z4">Bricked faces</a></dd>\
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
                    <dd><a href="https://v0s.nl/maze">Experiments with Mazes</a></dd>\
                    <dd><a href="https://v0s.nl/blackwhite">Experiments in Black and White</a></dd>\
                </dt>\
                <dt> Games\
                    <dd><a href="https://v0s.nl/inkteger">Inkteger</a></dd>\
                </dt>\
                <dt> Miscellaneous\
                    <dd><a href="https://v0s.nl/kleuren">Naming Colors</a></dd>\
                    <dd><a href="https://v0s.nl/eyes">Vierkante Oogjes</a></dd>\
                    <dd><a href="https://v0s.nl/contact">Contact</a></dd>\
                </dt>\
            </dl>\
            <div class="menuBottom" style="font-size:0.7rem; display: inline"><p>license: <a id="MENUlicense" href= "https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA</a></p><br>\
            <p onclick="MENUOBJECT.changeLanguage(\'en\')" id="menuEN">English</p><p>/</p><p onclick="MENUOBJECT.changeLanguage(\'nl\')" id="menuNL">Nederlands</p>\
            </div>\
        </div>\
    </div>';

    let menuCSS = '<link href="https://fonts.googleapis.com/css?family=Space+Mono" rel="stylesheet"> ' +
    '<style>' +  
        '#mouseArea, #mouseArea p, #mouseArea a{\
            all: initial;\
          }'+
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
            font-size: 1em;\
            background-color: hsla(249, 30%, 20%,0.9);\
            // overflow: scroll;\
        }' + 
        '#interface a {\
            font-family: "Space Mono", monospace;\
            font-size: 1rem;\
            font-weight: bolder;\
            color:  hsla(21, 9%, 92%,0.9) !important;\
            text-decoration: none;\
        }' + 
        '#interface a:hover{\
            cursor: pointer;\
        }' + 
        '.menuBottom p {\
            color:  hsla(21, 9%, 92%,0.9) !important;\
            font-family: "Space Mono", monospace !important;\
            font-size: 0.8rem !important;\
            display: inline;\
            padding:0;\
            margin: 5px;\
            background: none}' 
        +
        '#MENUlicense {\
            font-size: 0.8rem !important;}'+ 
        '</style>';

    //insert menu styling
    let head = document.getElementsByTagName('head')[0];
    head.insertAdjacentHTML('beforeend', menuCSS);

    //insert menu in html
    let body = document.getElementsByTagName('body')[0];
    body.insertAdjacentHTML('beforeend', menuHTML);

    let lang = "nl";
    document.getElementById("menuNL").style.fontWeight = "bolder";

    return {
        showInterface: function() {
        // let m = document.getElementById('mouseArea');
        // m.style.color='transparent';
        let i = document.getElementById('interface');
        i.style.display='block';
        },

        hideInterface: function() {
        // let m = document.getElementById('mouseArea');
        // m.style.color='initial';
        let i = document.getElementById('interface');
        i.style.display='none';
        },
        changeLanguage: function(l) {
            if (lang !== l) {
                if (lang == "nl") {lang = "en"} else {lang = "nl"};
                let enp = document.getElementsByClassName("en");
                let nlp = document.getElementsByClassName("nl");
                if (lang == "nl") {
                    document.getElementById("menuEN").style.fontWeight = "normal";
                    document.getElementById("menuNL").style.fontWeight = "bolder";
                    for(var i=0; i<nlp.length; i++) {
                        nlp[i].style.display = 'block';
                    }
                    for(var i=0; i<enp.length; i++) {
                        enp[i].style.display = 'none';
                    }
                } else if (lang == "en") {
                    document.getElementById("menuNL").style.fontWeight = "normal";
                    document.getElementById("menuEN").style.fontWeight = "bolder";
                    for(var i=0; i<nlp.length; i++) {
                        nlp[i].style.display = 'none';
                    }
                    for(var i=0; i<enp.length; i++) {
                        enp[i].style.display = 'block';
                    }
                }
            }
        },
        lang
    }
}();

//TODO make menu tab accessable!
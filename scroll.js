h2FromTop();
window.onscroll = function() {visible()};
var nl = true;
var en = false;

function h2FromTop() {
    var h2s = document.querySelectorAll('h2');
    for (var i = 0; i < h2s.length; i++) {
        h2s[i].distFromTop = distanceFromTop(h2s[i]);
    }
}

function distanceFromTop(element) {
    var yPosition = 0;

    while(element) {
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return yPosition;
}

function visible() {
    var h2s = document.querySelectorAll('h2');
    var vis = (document.body.scrollTop || document.documentElement.scrollTop) + window.innerHeight - 100;
    for (var i = 0; i < h2s.length; i++) {
        if (vis > h2s[i].distFromTop) {
            h2s[i].classList.add('move');
        }
    };
}

function changeLanguage() {
    nl = !nl;
    en = !en;
    let button = document.getElementById("lang");
    let enp = document.getElementsByClassName("en");
    let nlp = document.getElementsByClassName("nl");
    if (nl) {
        button.innerHTML = "EN";
        for(i=0; i<nlp.length; i++) {
            nlp[i].style.display = 'block';
        }
        for(i=0; i<enp.length; i++) {
            enp[i].style.display = 'none';
        }
    } else if (en) {
        button.innerHTML = "NL";
        for(i=0; i<nlp.length; i++) {
            nlp[i].style.display = 'none';
        }
        for(i=0; i<enp.length; i++) {
            enp[i].style.display = 'block';
        }
    }
}
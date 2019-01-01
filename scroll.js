h2FromTop();
window.onscroll = function() {visible()};

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

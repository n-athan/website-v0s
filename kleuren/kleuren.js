let kleuren = {
    "rood": 0,
    "oranje": 30,
    "geel" : 60,
    "gras" : 90,
    "groen": 120,
    "turkoois" : 150,
    "cyaan": 180,
    "blauw" : 210,
    "indigo" : 240,
    "paars": 270,
    "magenta" : 300,
    "roze": 330
}

let mkl = "bcdfghjklmnpqrstvwxz"
let klks = "aeiou"
let mklCombi = ["bb", "bl", "br", "ch", "ck", "cl", "cr", "cs", "dd", "dh", "dj", "dl", "dr", "ff", "fl", "fr", "fs", "gg", "gl", "gr", "hl", "ht", "jl", "kk", "kl", "km", "kn", "kr", "lg", "ll", "ml", "mm", "mn", "mr", "nj", "nl", "nn", "ng", "nk", "nr", "ns", "nt", "pf", "ph", "pj", "pl", "pm", "pn", "pp", "pr", "ps", "ql", "qr", "rb", "rh", "rk", "rs", "rt", "sf", "sh", "sj", "sl", "sm", "sn", "sp", "sq", "sr", "ss", "st", "sw", "tb", "th", "tl", "tr", "ts", "tt", "tw", "vl", "vr", "vs", "vv", "wl", "wr", "ww", "xl", "xr", "xx", "zf", "zh", "zj", "zl", "zm", "zn", "zp", "zq", "zr", "zz", "zt", "zw"]
let kleur = Object.keys(kleuren);

var lint = document.getElementsByClassName("lint")[0];
var rect = lint.getBoundingClientRect();
var scl, pos, t;

function lintOver(e) {
    const maxX = lint.offsetWidth;
    const maxY = lint.offsetHeight;
    if (maxX >= 700) {
        scl = 360/maxX;
        pos = e.clientX - rect.left;
    } else {
        t = document.documentElement.scrollTop;
        if (!t) {t = document.body.scrollTop};
        scl = 360/maxY;
        pos = e.clientY + t;     
        console.log(maxY, pos)   
    }
    let i = Math.floor(scl*pos);
    let kn = kleurNaam(i);
    const result = document.getElementsByClassName("result")[0];
    let p = "<p style='color: hsl("+i+",50%,50%)'>"+i+" "+kn+"</p>"
    result.innerHTML = p;
}


function kleurNaam (hue) {
    hue = hue % 360;
    kleur.sort((a,b) => {
        let d1 = Math.abs(kleuren[a]-hue);
        let d2 = Math.abs(kleuren[b]-hue);
        return d1 - d2;
    })
    let w = 1-Math.abs(hue - kleuren[kleur[0]])/Math.abs(kleuren[kleur[1]] - kleuren[kleur[0]]);
    return avgWord(kleur[0], kleur[1],w);
}

function stringToCharCode(string) {
    return string.split("").map(a => a.charCodeAt(0));
}

function avgWord(str1, str2, weigth) {
    let w = weigth;
    let a = stringToCharCode(str1);
    let b = stringToCharCode(str2);    
    let c = [];
    for (var i = 0; i < a.length*w+b.length*(1-w); i++) {
        if (!a[i]) {c.push(b[i])}
        else if (!b[i]) {c.push(a[i])}
        else {
        c.push(Math.round(w*a[i]+(1-w)*b[i]))
        }
    }
    c = c.map(a => String.fromCharCode(a)).join("");
    return makeRealWord(c,str1,str2,w);
    // return c;
}

function vowelsInWord(str) {
    let v = [];
    for (i in klks) {
        if (str.includes(klks[i])) v.push(klks[i]);
    }
    return v;
}

function makeRealWord(str,a,b,w) {
    let vw = [];
    let va = vowelsInWord(a);
    let vb = vowelsInWord(b);
    for (var i = 0; i<w*10; i++){vw = vw.concat(va)};
    for (var j = 0; j<(1-w)*10; j++){vw = vw.concat(vb)};

    for (var i = 0; i < str.length-1 ; i++) {
        if (mkl.includes(str[i])&&mkl.includes(str[i+1])) {
            if (mklCombi.includes((str[i]+str[i+1]))) {
                str = str;
            }
            else {
                let klk = vw[Math.floor(Math.random()*vw.length)];
                str = str.substring(0,i+1) + klk + str.substring(i+1,str.length);
            }
        } else {str = str}
    }
    return str
}

// function fill() {
//     b = document.getElementsByTagName("body")[0];
//     for (var i = 0; i < 361; i++) {
//         let a = kleurNaam(i);
//         let w = (i%30 == 0 )? "; font-weight: 700": "";
//         let p = "<p style='color: hsl("+i+",50%,50%)"+w+"'>"+a+"</p>"
//         b.insertAdjacentHTML('beforeend', p);
//     }
// }

// fill();


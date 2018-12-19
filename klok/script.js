// Get current time
function startTime() {
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    h=checkTime(h);
    m=checkTime(m);
    document.getElementById('txt').innerHTML=h+' '+m;
    t=setTimeout('startTime()',3000);
}
// add a zero in front of numbers<10
function checkTime(i) {
    if (i<10) {
        i="0" + i;
    }
    return i;
}
// Get correct greeting for time of day
function checkPartday() {
    var h= new Date().getHours();
    var g="dag";
    if (h<6) {
        g = "nacht";
    } else if (h<12) {
        g = "morgen";
    } else if (h<18) {
        g = "middag";
    } else {
        g = "avond";
    }
    document.getElementById("partday").innerHTML = g;
}
// Get day, date, month in dutch
function dayMonth() {
    var options = {weekday: 'long', day: 'numeric', month: 'long' };
    var prnDt = new Date().toLocaleDateString('nl-nl', options);
    document.getElementById("day").innerHTML = prnDt;
}

// Citaten van citaten.net
function getMessage() {
    var ar = [
    "Vooruitgang is dat alle eskimo's centrale verwarming krijgen, zodat ze zich kapot moeten werken om een ijskast te kopen - Wim Sonneveld"
    ,"De moeilijkste opgave voor de leraar is de leerling het plezier in het leren niet te bederven - Bertrand Russell"
    ,"Luiheid: de gewoonte om te rusten voordat de vermoeidheid inzet - Renard, Jules"
    ,"Kies altijd de weg, die de beste schijnt te zijn, hoe ruw hij ook moge zijn De gewoonte zal hem gemakkelijk maken - Pythagoras"
    ,"Men beloont een leraar slecht als men steeds zijn leerling blijft - Friedrich Nietzsche"
    ,"Computer: een soort geheelonthouder - Wim Kan"
    ,"Nu er een begin gemaakt is, zal het beste altijd volgen - Hermann Hesse"
    ,"Eén ding zal de computer nooit kunnen: van de apen afstammen - Piet Grijs"
    ,"Er is een lang leven voor nodig om de gevolgen van de opvoeding geheel te boven te komen - Jan Greshoff"
    ,"Als je doet wat je leuk vindt, hoef je nooit te werken - Mahatma Gandhi"
    ,"Logica brengt je van A naar B. Verbeelding brengt je overal - Albert Einstein"
    ,"Alles dat werkelijk groots en inspirerend is, is gecreëerd door een individu dat kon werken in vrijheid - Albert Einstein"
    ,"De tijd bestaat alleen maar omdat anders alles tegelijk zou gebeuren - Albert Einstein"
    ,"Als ik zou willen dat je het begreep, had ik het wel beter uitgelegd - Johan Cruijff"
    ,"Wie oude kennis koestert en voortdurend nieuwe vergaart, mag een leraar v an anderen zijn - Confucius"
    ,"Een mens heeft twee oren en één mond om twee keer zoveel te luisteren dan te praten - Confucius"
    ,"Geef me werk wat bij me past en ik hoef nooit meer te werken - Confucius"
    ,"Ideale computer, nog uit te vinden: je stopt er je problemen in en ze komen er nooit meer uit - Marc Callewaert"
    ,"Een goed leraar moet zowel inspireren als irriteren - Boeddha"
    ,"Tijd is de beste leraar maar helaas doodt hij al zijn leerlingen - Hector Berlioz"
    ,"Kwaliteit is geen daad, het is een gewoonte - Aristoteles"
    ,"De computer kan meer werk doen in minder tijd dan de mens omdat hij niet aan de telefoon hoeft te komen - Joey Adams"
    ,"Reflecteer niet op de wereld. Laat de wereld jou relecteren. - Nathan"]
    
    var rand = ar[Math.floor(Math.random() * ar.length)];
    document.getElementById("quote").innerHTML=rand;
}

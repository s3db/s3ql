 // pokeClient.js
// note check for jQuery at the end

console.log('pokeClient loaded');

poke = function() {
    poke.ini()
};

poke.ini = function() {
    console.log('asking for mongo URI');
    $('#pokeDiv').html('MongoDb URI: <input id="mongoUri" size="70" placeholder="mongodb://<user>:<password>@<url>:<port>/<database>"> (enter)');
    $('#mongoUri').keypress(function(evt){
        if(evt.charCode==13){
            console.log(this.value);
        }
    })
}


// jQuery

if (!window.jQuery) {
    var s = document.createElement('script');
    s.src = 'https://code.jquery.com/jquery-2.0.3.min.js';
    s.onload = poke;
    document.head.appendChild(s);
} else {
    poke()
}
;



const seedrandom = require("seedrandom");
const request = require('request');
const rp = require('request-promise');
const fs = require("fs");
const https = require("https");

module.exports = {
  execute(a) {
    a.message.channel.startTyping();
    
    var seed = new Date().toLocaleString("en-US", {timeZone: "Europe/Amsterdam"}).split(",")[0] + a.message.author.id;
    var rng = seedrandom(seed);
    var nomen = [
      "Mensch,0",
      "Tier,2",
      "Stuhl,0",
      "Flasche,1",
      "Tisch,0",
      "Mittagessen,2",
      "Pilger,0",
      "Vitrine,1",
      "Schwamm,0",
      "Insekt,2",
      "Maus,1",
      "Glocke,1",
      "Künstler,0",
      "Antenne,1",
      "Geige,1",
      "Hose,1",
      "Kokosnuss,1",
      "Wunder,2",
      "Clown,0",
      "Kaktus,0",
      "Sardine,1",
      "Zelle,1",
      "Schuh,0",
      "Hut,0",
      "Zahn,0",
      "Ellbogen,0",
      "Giraffe,1",
      "Katastrophe,1",
      "Pflanze,1",
      "Matrose,0",
      "Eskimo,0",
      "Zahl,1",
      "Walzer,0",
      "Schraube,1",
      "Vogel,0",
      "Asteroid,0",
      "Tropfen,0",
      "Serviette,1",
      "Asiate,0",
      "Spiel,2",
      "Mitarbeiter,0",
      "Luftakrobat,0",
      "Stern,0",
      "Scheibe,1",
      "Magnet,0",
      "Bruder,0"
    ];
    var adj = [
      "klug",
      "groß",
      "klein",
      "dumm",
      "dunkl",
      "hell",
      "rot",
      "grün",
      "blau",
      "lustig",
      "gebraten",
      "zitternd",
      "fettleibig",
      "sicher",
      "seltsam",
      "cool",
      "hell",
      "richtig",
      "leistungsfähig",
      "radikal",
      "hoh",
      "salzig"
    ];
    
    var n = nomen[Math.floor(rng()*nomen.length)];
    var ad = adj[Math.floor(rng()*adj.length)];
    var art;
    
    switch (n.split(",")[1]) {
      case "0":
        ad += "er";
        art = "ein";
        break;
      case "1":
        ad += "e";
        art = "eine";
        break;
      case "2":
        ad += "es";
        art = "ein";
        break;
    }
    var word = encodeURI(n.split(",")[0]);
    rp("https://translate.googleapis.com/translate_a/single?client=gtx&sl=de&tl=en&dt=t&q="+word)
    .then(html => {
      var json = JSON.parse(html);
      var translated = json[0][0][0];
      
      var url = "https://source.unsplash.com/random/256x256/?"+translated;
      
      a.message.channel.send(`Heute bist du ${art} ${ad} ${n.split(",")[0]}`, {
        files: [{
          attachment: url,
          name: "image.png"
        }]
      });
      
    });
    
    a.message.channel.stopTyping();
	},

	info: {
		name: "me",
		description: "Zeigt dir, was dir heute am ehesten ähnelt",
		alias: undefined,
    category: "daily"
	}
};

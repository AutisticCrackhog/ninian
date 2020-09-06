const Discord = require("discord.js");

module.exports = {
	execute(a) {
    // Erster Versuch OOP
    
    class Karte {
      constructor(bild, symbol, punkt) {
        this.bild = bild;
        this.symbol = symbol;
        this.punkt = punkt;
      }
      
      toString() {
        return this.bild + "," + this.symbol;
      }
    }
    
    class Deck {
      constructor() {
        this.bildArr = ["Ass", 2, 3, 4, 5, 6, 7, 8, 9, 10, "König", "Bube", "Dame"];
        this.ptArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
        this.symbolArr = ["Pik", "Herz", "Karo", "Kreuz"];
        this.ausgaben = {};
      }
      
      ausgeben() {
        var rnd = Math.floor(Math.random()*this.bildArr.length)
        var bild = this.bildArr[rnd];
        var punkt = this.ptArr[rnd];
        var symbol = this.symbolArr[Math.floor(Math.random()*this.symbolArr.length)];
        
        var karte = new Karte( bild, symbol, punkt );
        
        if (this.ausgaben[karte.toString()]) { 
          if (this.ausgaben[karte.toString()] >= 6) {
            return this.ausgeben();
          } else {
            this.ausgaben[karte.toString()]++;
            return karte;
          }
        } else {
          this.ausgaben[karte.toString()] = 1;
          return karte;
        }
      }
    }
    
    class Spieler {
      constructor(user) {
        this.user = user;
        this.karten = [];
      }
      
      punkte() {
        var punkte = 0;
        for (const karte of this.karten) {
          if (karte.bild == "Ass") {
            punkte+11 <= 21 ? punkte += 11 : punkte++;
          } else {
            punkte += karte.punkt;
          }
        }
        return punkte;
      }
    }
    
    class Spiel {
      constructor() {
        this.deck = new Deck();
        this.spieler = new Spieler(a.message.author);
        this.dealer = new Spieler(a.client.user);
      }
      
      start() {
        this.spieler.karten.push(this.deck.ausgeben());
        this.spieler.karten.push(this.deck.ausgeben());
        
        this.dealer.karten.push(this.deck.ausgeben());
        this.dealer.karten.push(this.deck.ausgeben());
      }
      
      status1() {
        var str = "";
        for (const karte of this.spieler.karten) {
          str += "\n"+karte.toString().split(",").join(" - ");
        }
        str += "\n"+this.spieler.punkte();
        str.substring(0, 2);
        
        const embed = new Discord.MessageEmbed()
        .setTitle("Black Jack")
        .setColor("#a1ffff")
        .addField("Ninian:", this.dealer.karten[0].toString().split(",").join(" - ") +"\n...\n"+this.dealer.karten[0].punkt)
        .addField(this.spieler.user.username+":", str)
        .setFooter(": Hit | ✋: Stand", "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Ski_trail_rating_symbol-green_circle.svg/1200px-Ski_trail_rating_symbol-green_circle.svg.png")
        return embed;
      }
      
      lose() {
        var str = "";
        for (const karte of this.spieler.karten) {
          str += "\n"+karte.toString().split(",").join(" - ");
        }
        str += "\n"+this.spieler.punkte();
        str.substring(0, 2);
        
        var str2 = "";
        for (const karte of this.dealer.karten) {
          str2 += "\n"+karte.toString().split(",").join(" - ");
        }
        str2 += "\n"+this.dealer.punkte();
        str2.substring(0, 2);
        
        const embed = new Discord.MessageEmbed()
        .setTitle("Black Jack")
        .setDescription("Spiel verloren")
        .setColor("#ee3333")
        .addField("Ninian:", str2)
        .addField(this.spieler.user.username+":", str)
        .setFooter(": Hit | ✋: Stand", "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Ski_trail_rating_symbol-green_circle.svg/1200px-Ski_trail_rating_symbol-green_circle.svg.png")
        return embed;
      }
      
      win() {
        var str = "";
        for (const karte of this.spieler.karten) {
          str += "\n"+karte.toString().split(",").join(" - ");
        }
        str += "\n"+this.spieler.punkte();
        str.substring(0, 2);
        
        var str2 = "";
        for (const karte of this.dealer.karten) {
          str2 += "\n"+karte.toString().split(",").join(" - ");
        }
        str2 += "\n"+this.dealer.punkte();
        str2.substring(0, 2);
        
        const embed = new Discord.MessageEmbed()
        .setTitle("Black Jack")
        .setDescription("Spiel gewonnen!")
        .setColor("#33ee33")
        .addField("Ninian:", str2)
        .addField(this.spieler.user.username+":", str)
        .setFooter(": Hit | ✋: Stand", "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Ski_trail_rating_symbol-green_circle.svg/1200px-Ski_trail_rating_symbol-green_circle.svg.png")
        return embed;
      }
      
      tie() {
        var str = "";
        for (const karte of this.spieler.karten) {
          str += "\n"+karte.toString().split(",").join(" - ");
        }
        str += "\n"+this.spieler.punkte();
        str.substring(0, 2);
        
        var str2 = "";
        for (const karte of this.dealer.karten) {
          str2 += "\n"+karte.toString().split(",").join(" - ");
        }
        str2 += "\n"+this.dealer.punkte();
        str2.substring(0, 2);
        
        const embed = new Discord.MessageEmbed()
        .setTitle("Black Jack")
        .setDescription("Unentschieden")
        .setColor("#eeee33")
        .addField("Ninian:", str2)
        .addField(this.spieler.user.username+":", str)
        .setFooter(": Hit | ✋: Stand", "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Ski_trail_rating_symbol-green_circle.svg/1200px-Ski_trail_rating_symbol-green_circle.svg.png")
        return embed;
      }
      
      spielerAddKarte() {
        this.spieler.karten.push(this.deck.ausgeben());
      }
      
      dealerAddKarte() {
        this.dealer.karten.push(this.deck.ausgeben());
      }
    }
    
    (function main(args) {
      
      var spiel = new Spiel();
      spiel.start();
      a.message.channel.send(spiel.status1())
      .then(msg => {
        msg.react("🟢").then(() => msg.react("✋"));
        
        const filter = (reaction, user) => {
          return ( reaction.emoji.name === "🟢" || reaction.emoji.name === "✋" ) &&  user.id === a.message.author.id && !user.bot;
        };
        
        repeat();
        function repeat() {
          const collector = msg.createReactionCollector(filter, { max: 1, time: 15000 });

          collector.on("end", (collected, reason) => {
            if (reason == "time") {
              a.message.channel.send("Das Spiel wurde abgebrochen");
              return;
            }
            
            if (collected.first().emoji.name == "🟢") {
              spiel.spielerAddKarte();
              msg.edit(spiel.status1());
              if (spiel.spieler.punkte() <= 21) {
                repeat();
              } else {
                msg.edit(spiel.lose());
              }
            }
            
            if (collected.first().emoji.name == "✋") {
              while (spiel.dealer.punkte() < 17) {
                spiel.dealerAddKarte()
              }
              if (spiel.dealer.punkte() > spiel.spieler.punkte() && spiel.dealer.punkte() <= 21) {
                msg.edit(spiel.lose());
              } else {
                if (spiel.spieler.punkte() == spiel.dealer.punkte()) {
                  msg.edit(spiel.tie());
                } else {
                  msg.edit(spiel.win());
                }
              }
            }
          });
        }
        
      });
      
      
    })();
    
	},

	info: {
		name: "blackjack",
		description: "Zum spielen von Black Jack gegen Ninian",
		alias: ["bj"],
    category: "spiele"
	}
};

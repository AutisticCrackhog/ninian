const fs = require("fs");

module.exports = {
	execute(a) {
    let sets = JSON.parse(fs.readFileSync("./data/werwolf.json"));
    let pickedSet;
    
    if (!a.args[0] || true) {
      pickedSet = sets[Math.floor(Math.random()*sets.length)];
    }

    a.message.channel.send(`Eine neue Runde von Werwolf gestartet. ${a.message.author.toString()} ist der Erzähler und es wird mit dem Set **"${pickedSet.name} "** gespielt. Reagiere, um mitzumachen (15 Sekunden)`)
    .then(msg => {
      msg.react("🐺");

      var players = [];
      
      const filter = (reaction, user) => {
        return reaction.emoji.name === "🐺" && !user.bot && user.id !== a.message.author.id;
      };

      const collector = msg.createReactionCollector(filter, { time: 15000 });
      
      collector.on("collect", (reaction, user) => {
        a.message.channel.send(`${user.username} macht mit! (${players.length+1}/4)`);
        players.push(user);
      });

      class dummy {
        constructor(name) {
          this.username = name;
          this.channel = a.message.channel;
        }
        send(txt) {
          this.channel.send(`*DM an ${this.username}:* \n${txt}`)
        }
      }

      collector.on("end", collected => {
        if (players.length < 4) {
          a.message.channel.send("Es machen nicht genug Spieler mit. Mindestens 4 Spieler müssen dabei sein");
          players.push(new dummy("Robinjonator", a.message.channel))
          players.push(new dummy("Nathan Swist", a.message.channel))
          players.push(new dummy("OniHero", a.message.channel))
          players.push(new dummy("Apollon", a.message.channel))
          players.push(new dummy("LPFan", a.message.channel))
          players.push(new dummy("Kevin", a.message.channel))
        }

        players = players.sort(() => Math.random() - 0.5);

        split = Math.floor(players.length / 3);

        for (var i = 0; i < split; i++) {
          players[i].role = "Dörfler"
        }
        for (var i = split; i < split*2; i++) {
          players[i].role = "Ulfhedin"
        }
        for (var i = split*2; i < split*3; i++) {
          players[i].role = "Special"
        }
        if (players.length > split*3) {
          for (var i = 0; i < players.length - split*3; i++) {
            if (i == 0) {
              players[i+split*3].role = "Special";
            } else {
              players[i+split*3].role = "Dörfler";
            }
          }
        }

        players.forEach(x => {
          if (x.role == "Special") {
            x.role = pickedSet.rollen[Math.floor(Math.random()*pickedSet.rollen.length)];
          }
        })

        let str = "";
        players.forEach(x => {
          x.send("Du bist "+x.role);
          str += x.username + ": " + x.role + "\n";
        });

        a.message.author.send(str);
      });

    });
	},

	info: {
		name: "werwolf",
		description: "\u200b",
		alias: undefined
	}
};

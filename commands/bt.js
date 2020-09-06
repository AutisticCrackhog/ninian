const fs = require("fs");

module.exports = {
	execute(a) {
    var lives;
    if (!isNaN(parseInt(a.args[0]))) {
      lives = parseInt(a.args[0]);
    } else {
      lives = 2;
    }

    a.message.channel.send("Eine neue Run de vom Wortspiel wurde gestartet! Gespielt wird mit **"+lives+" Leben**. Reagiere, um mitzumachen (15 Sekunden bis beginn)")
    .then(msg => {
      msg.react("👍");
      
      var players = [];
      
      const filter = (reaction, user) => {
        return reaction.emoji.name === '👍' && !user.bot;
      };

      const collector = msg.createReactionCollector(filter, { time: 15000 });
      
      collector.on("collect", (reaction, user) => {
        a.message.channel.send(`${user.username} macht mit!`);
        user.bt = {
          hp: lives
        }
        players.push(user);
      });
      
      collector.on("end", collected => {
        if (players.length == 0) {
          a.message.channel.send("Niemand spielt mit? Schade");
          return;
        }
        if (players.length == 1) {
          a.message.channel.send("Wenn niemand will, mache ich mit!");
          a.client.user.bt = {
            hp: lives,
            answer: (solution) => {
              var mind = Math.floor(Math.random()*10)+1;
              switch (mind) {
                case 10:
                  a.message.channel.send("...");
                  break;
                default:
                  a.message.channel.send(solution);
                  break;
              }
            }
          };
          players.push(a.client.user);
        }

        players.sort(() => Math.random() - 0.5);

        a.message.channel.send("Das Spiel beginnt!")
        
        var words = fs.readFileSync("./data/deutsch.txt").toString().split("\n").map(x => x.toLowerCase());

        var turn = 0; var round = 1;
        
        const loop = (user) => {
          var solution = words[Math.floor(Math.random()*words.length)];
          var letters = solution.substr(Math.floor(Math.random()*(solution.length-3)), 3).toLowerCase();

          solution = solution.charAt(0).toUpperCase() + solution.slice(1);

          a.message.channel.send(user.toString()+", finde ein Wort mit **"+letters.toUpperCase()+"**")
          .then(msg2 => {
            const filter = m => {
              m.content = m.content.replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue")
              return m.content.toLowerCase().includes(letters) && words.includes(m.content.toLowerCase()) && m.author.id === user.id;
            };

            ms = 10000 - (Math.floor(round/2) * 2000);
            if (ms < 5000) ms = 5000;

            const collector = msg2.channel.createMessageCollector(filter, { time: ms, max: 1 });

            if (user == a.client.user) {
              user.bt.answer(solution);
            }

            collector.on("end", collected => {
              if (collected.size == 0) {
                user.bt.hp--;
                a.message.channel.send(user.username+": HP -1 ("+user.bt.hp+")");

                if (user.bt.hp <= 0) {
                  a.message.channel.send(user.username+" hat keine Versuche mehr");
                  players.splice(turn, 1);
                }

                turn++;
                if (turn >= players.length) {
                  turn = 0;
                  round++;
                }
                if (players.length == 1) {
                  a.message.channel.send(players[0].username+" hat das Spiel gewonnen! 🎉");
                  return;
                }

                loop(players[turn])
              } else {
                collected.first().react("👍");
                turn++;
                if (turn == players.length) turn = 0;
                loop(players[turn]);
              }
            })
          });
        }
        loop(players[turn]);
      });
    });
	},

	info: {
		name: "bt",
		description: "Ein Spiel, bei dem man anhand Buchstaben ein passendes Wort finden muss",
		alias: undefined,
    usage: "[HP]",
    category: "spiele"
	}
};

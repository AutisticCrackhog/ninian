module.exports = {
	execute(a) {
    var time = 2000;
    
    a.message.channel.send("Eine neue Runde vom Roulette wird gestartet! Reagiere, um mitzumachen (15 Sekunden bis beginn)")
    .then(msg => {
      msg.react("💀");
      
      var players = [];
      
      const filter = (reaction, user) => {
        return reaction.emoji.name === '💀' && !user.bot;
      };

      const collector = msg.createReactionCollector(filter, { time: 15000 });
      
      collector.on("collect", (reaction, user) => {
        a.message.channel.send(`${user.username} macht mit!`);
        players.push(user);
      });
      
      collector.on("end", collected => {
        if (players.length == 0) {
          a.message.channel.send("Niemand spielt mit? Schade");
          return;
        }
        if (players.length == 1) {
          a.message.channel.send("Du willst das Spiel alleine spielen? Nun gut...")
        }
        var turn = 0;
        var round = 0;
        var bullets = 0;
        players.sort(() => Math.random() - 0.5);
        a.message.channel.send("Das Spiel beginnt");
        
        var running = true;
        var game = () => {
          if (round % 2 == 0 && bullets < 5 && turn == 0) {
            bullets++;
            if (bullets != 1) a.message.channel.send("Eine weitere Patrone wurde hinzugefügt");
          }
          a.message.channel.send(players[turn].username+" ist an der Reihe. Er dreht an der Trommel und...")
          .then(async msg2 => {
            var check = () => {
              if (Math.floor(Math.random()*6)+1 <= bullets) {
                running = false;
                msg2.edit("💀 "+players[turn].username+" ist **gestorben**, und hat damit das Spiel verloren!");
                return;
              } else {
                msg2.edit(players[turn].username+" hat **überlebt**");
                if (turn == players.length - 1) {
                  turn = 0;
                  round++;
                } else {
                  turn++
                }
              }
              console.log(turn);
            }
            setTimeout(check, time);
            setTimeout(restart, time);
          })
        }
        var restart = () => { if (running) setTimeout(game, time); }
        restart();
      });
      
    }).catch(() => {});
    
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
	},

	info: {
		name: "roulette",
		description: "Spiele eine Runde Russisches Roulette",
		alias: undefined,
    category: "spiele"
	}
};
const Discord = require("discord.js");

module.exports = {
	execute(a) {
    const chars = {
      mario: {
        name: "Mario",
        emotes: ":billed_cap: :man: :red_circle:"
      },
      link: {
        name: "Link",
        emotes: ":man_elf: :bow_and_arrow: :shield:"
      },
      pit: {
        name: "Pit",
        emotes: ":angel: :bow_and_arrow:"
      },
      zelda: {
        name: "Zelda",
        emotes: ":elf: :fire: :large_blue_diamond:"
      },
      jigglypuff: {
        name: "Jigglypuff",
        emotes: ":balloon: :sleeping:"
      },
      kirby: {
        name: "Kirby",
        emotes: ":wind_blowing_face: :star:"
      }
    };
    
    var keys = Object.keys(chars);
    var char = chars[keys[ keys.length * Math.random() << 0]];
    
    a.message.channel.send("Wer ist dieser Charakter? (Englischer Name)\n"+char.emotes)
    .then((msg) => {
      const filter = m => m.author.id === a.message.author.id;
      const collector = a.message.channel.createMessageCollector(filter, { time: 20000, max: 1 });
      
      collector.on("collect", m => {
        if (m.content.toLowerCase() == char.name.toLowerCase()) {
          a.message.channel.send("Richtig, es ist "+char.name+"!");
        } else {
          a.message.channel.send("Falsch, es ist "+char.name);
        }
      });
    });
	},

	info: {
		name: "guess",
		description: "Versuch einen Charakter zu erkennen",
		alias: undefined
	}
};

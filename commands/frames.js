const Discord = require('discord.js');
const request = require('request');
const rp = require('request-promise');
const cheerio = require('cheerio');

module.exports = {
	execute(a) {
		if (!a.args[0]) {
			a.message.channel.send("Es wurde kein Charakter angegeben\n`-frames <Charakter>: <Move>`");
			return;
		}
		if (!a.args[1]) {
			a.message.channel.send("Der Name des Moves fehlt\n`-frames <Charakter>: <Move>`");
			return;
		}
		if (!a.args.join(" ").includes(":")) {
		  a.message.channel.send("`-frames <Charakter>: <Move | list>`")
		}
		let [character, movename] = a.args.join(" ").split(":").map(x => x.trim())

		const characters = ["Banjo & Kazooie","Bayonetta","Bowser","Bowser Jr","Byleth","Captain Falcon","Chrom","Cloud","Corrin","Daisy","Dark Pit","Dark Samus","Diddy Kong","Donkey Kong","Dr Mario","Duck Hunt","Falco","Fox","Ganondorf","Greninja","Hero","Ice Climbers","Ike","Incineroar","Inkling","Isabelle","Jigglypuff","Joker","Ken","King Dedede","King K Rool","Kirby","Link","Little Mac","Lucario","Lucas","Lucina","Luigi","Mario","Marth","Mega Man","Meta Knight","Mewtwo","Mii Brawler","Mii Gunner","Mii Swordfighter","Mr Game & Watch","Ness","Olimar","Pac Man","Palutena","Peach","Pichu","Pikachu","Piranha Plant","Pit","Pt Squirtle","Pt Ivysaur","Pt Charizard","Richter","Ridley","Rob","Robin","Rosalina & Luma","Roy","Ryu","Samus","Sheik","Shulk","Simon","Snake","Sonic","Terry","Toon Link","Villager","Wario","Wii Fit Trainer","Wolf","Yoshi","Young Link","Zelda","Zero Suit Samus", "Min Min", "Steve"];
		const autocorrect = require("autocorrect")({words: characters});

		var name = autocorrect(character);
		var urlName = "/"+name.toLowerCase().replace("&", "and").replace(/ /g, "_")+".php";
		var url = "https://ultimateframedata.com"+urlName;

		rp(url)
			.then(function(html){
				var $ = cheerio.load(html);

				// Get all moves in an array.
				var movelist = $(".movecontainer > .movename").text().split("\n");
				movelist = movelist.filter(function(el, index) {
			    return index % 2 === 1;
			  });
				movelist = movelist.map(x => x.replace(/\t/g, ""));
				// Filter useless moves
				movelist = movelist.filter(el => !el.toLowerCase().includes("dodge")).filter(el => !el.toLowerCase().includes("roll")).filter(el => !el.toLowerCase().includes("charge"))
				movelist = movelist.map(el => {
					if (el.includes("(")) {
						el = el.split("(")[0].trim();
					}
					return el;
				})

				if (movename == "list") {
					a.message.channel.send("```"+movelist.join(", ")+"```");
					return;
				}

				var auto2 = require("autocorrect")({words: movelist});

				var argmove = "";
				for (var i = 1; i < a.args.length; i++) {
					argmove += " "+a.args[i];
					argmove = argmove.trim();
				}
				argmove = auto2(movename);

				// Get the index of the correct movecontainer class
				var index = "";
				$(".movecontainer").each((i, el) => {
					$(el).children().each((i2, el2) => {
						if ($(el2).text().includes(argmove)) {
							if (!index) {
								index = i;
							}
						}
					});
				});

				var gif = "https://ultimateframedata.com/"+$($(".movecontainer").get(index)).children(".hitbox").children().attr("data-featherlight");
				const embed = new Discord.MessageEmbed()
				.setColor(0xA1FFFF)
				.setTitle(name + " " + argmove)
				.setImage(gif)
        .setURL(url)
				.setFooter("Reagiere, um Frame Data anzuzeigen")
				a.message.channel.send(embed).then(msg => {
					msg.react("🗒️");
					const filter = (reaction, user) => {
						return reaction.emoji.name == "🗒️" && user.id === a.message.author.id;
					};

					msg.awaitReactions(filter, { max: 1, time: 20000, errors: ['time'] })
						.then(collected => {
              let data = $($(".movecontainer").get(index)).children();
              
              let framedata = [];
              data.each((i, el) => {
                framedata.push([el.attribs.class, el.children[0].data])
              })

              framedata.forEach(x => {
                x[1] = x[1].replace(/\t/g, "").replace(/\n/g, "");
              });
            
							const embed2 = new Discord.MessageEmbed()
							.setColor(0xA1FFFF)
							.setTitle(name + " " + argmove)
              .setURL(url)

							var text = "```\n";
              framedata.forEach(x => {
                if (x[1]) {
                  text += x[0]+": "+x[1]+"\n"
                }
              })
							text += "```";

							embed2.addField("Frame Data", text);
							msg.edit(embed2);
						}).catch(() => {})
				});
			});
	},

	info: {
		name: "frames",
		description: "Zeigt die Framedata von Moves an",
		usage: "<Charakter>: <Move | list>",
		alias: undefined,
    category: "smash"
	}
};

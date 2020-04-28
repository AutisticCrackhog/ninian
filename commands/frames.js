const Discord = require('discord.js');
const request = require('request');
const rp = require('request-promise');
const cheerio = require('cheerio');

module.exports = {
	execute(a) {
		if (!a.args[0]) {
			a.message.channel.send("Es wurde kein Charakter angegeben\n`-frames <Charakter> <Move>`");
			return;
		}
		if (!a.args[1]) {
			a.message.channel.send("Der Name des Moves fehlt\n`-frames <Charakter> <Move>`");
			return;
		}

		const characters = ["Banjo & Kazooie","Bayonetta","Bowser","Bowser Jr","Byleth","Captain Falcon","Chrom","Cloud","Corrin","Daisy","Dark Pit","Dark Samus","Diddy Kong","Donkey Kong","Dr Mario","Duck Hunt","Falco","Fox","Ganondorf","Greninja","Hero","Ice Climbers","Ike","Incineroar","Inkling","Isabelle","Jigglypuff","Joker","Ken","King Dedede","King K Rool","Kirby","Link","Little Mac","Lucario","Lucas","Lucina","Luigi","Mario","Marth","Mega Man","Meta Knight","Mewtwo","Mii Brawler","Mii Gunner","Mii Swordfighter","Mr Game & Watch","Ness","Olimar","Pac Man","Palutena","Peach","Pichu","Pikachu","Piranha Plant","Pit","Pt Squirtle","Pt Ivysaur","Pt Charizard","Richter","Ridley","Rob","Robin","Rosalina & Luma","Roy","Ryu","Samus","Sheik","Shulk","Simon","Snake","Sonic","Terry","Toon Link","Villager","Wario","Wii Fit Trainer","Wolf","Yoshi","Young Link","Zelda","Zero Suit Samus"];
		const autocorrect = require("autocorrect")({words: characters});

		var name = autocorrect(a.args[0]);
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

				if (a.args[1] == "list") {
					a.message.channel.send("```"+movelist.join(", ")+"```");
					return;
				}

				var auto2 = require("autocorrect")({words: movelist});

				var argmove = "";
				for (var i = 1; i < a.args.length; i++) {
					argmove += " "+a.args[i];
					argmove = argmove.trim();
				}
				argmove = auto2(argmove);

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
				console.log(i);

				var gif = "https://ultimateframedata.com/"+$($(".movecontainer").get(index)).children(".hitbox").children().attr("data-featherlight");
				const embed = new Discord.RichEmbed()
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
							var data = $($(".movecontainer").get(index)).text();
							data = data.replace(/\t/g, "").split("\n").filter(el => el.length).filter(el => !el.includes("Charge"))
              if (data[0] === "Ground" || data[0] === "Air") data.shift();
              if (data[0] === "Ground" || data[0] === "Air") data.shift();

							var classes = [];
							$($(".movecontainer").get(index)).children().each((i, el) => {
								classes.push($(el).attr("class"));
							});

							if (!data[0].startsWith("*")) classes.shift();
            
							const embed2 = new Discord.RichEmbed()
							.setColor(0xA1FFFF)
							.setTitle(name + " " + argmove)
              .setURL(url)

							var text = "```\n";
							for (const col in data) {
								text += classes[col]+": "+data[col]+"\n";
							}
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
		usage: "<Charakter> <Move | list>",
		alias: undefined
	}
};

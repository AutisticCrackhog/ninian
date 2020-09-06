const Discord = require('discord.js');
const request = require('request');
const rp = require('request-promise');
const cheerio = require('cheerio');

module.exports = {
	execute(a) {
		var url = 'https://www.eventhubs.com/tiers/ssbu/character/';
		var characters = [
      "Mario","Donkey Kong","Link","Samus","Dark Samus","Samus / Dark Samus","Yoshi","Kirby","Fox","Pikachu","Luigi","Ness","Captain Falcon","Jigglypuff","Peach","Daisy","Peach / Daisy","Bowser","Ice Climbers","Sheik","Zelda","Dr. Mario","Pichu","Falco","Marth","Lucina","Young Link","Ganondorf","Mewtwo","Roy","Chrom","Mr. Game & Watch","Meta Knight","Pit","Dark Pit","Pit / Dark Pit","Zero Suit Samus","Wario","Snake","Ike","Pokemon Trainer","Diddy Kong","Lucas","Sonic","King Dedede","Olimar","Lucario","R.O.B","Toon Link","Wolf","Villager","Mega Man","Wii Fit Trainer","Rosalina","Little Mac","Greninja","Mii Brawler","Mii Swordfighter","Mii Gunner","Palutena","Pac-Man","Robin","Shulk","Bowser Jr.","Duck Hunt","Ryu","Ken","Cloud","Corrin","Bayonetta","Inkling","Ridley","Simon","Richter","Simon / Richter","King K. Rool","Isabelle","Incineroar","Piranha Plant","Joker","Hero", "Banjo & Kazooie", "Terry", "Byleth", "Min Min"
    ];
		const autocorrect = require('autocorrect')({words: characters})

		if (!a.args.join(" ").includes("+")) {
		  a.message.channel.send("Die Namen müssen mit einem + getrennt werden");
			return;
		}
		a.message.channel.startTyping();
		var charone = autocorrect(a.args.join(" ").split("+")[0].toString().trim());
		if (charone == "Peach" || charone == "Daisy") {charone = "Peach / Daisy";} if (charone == "Samus" || charone == "Dark Samus") {charone = "Samus / Dark Samus";} if (charone == "Pit" || charone == "Dark Pit") {charone = "Pit / Dark Pit";} if (charone == "Simon" || charone == "Richter") {charone = "Simon / Richter";}
		var chartwo = autocorrect(a.args.join(" ").split("+")[1].toString().trim());
		if (chartwo == "Peach" || chartwo == "Daisy") {chartwo = "Peach / Daisy";} if (chartwo == "Samus" || chartwo == "Dark Samus") {chartwo = "Samus / Dark Samus";} if (chartwo == "Pit" || chartwo == "Dark Pit") {chartwo = "Pit / Dark Pit";} if (chartwo == "Simon" || chartwo == "Richter") {chartwo = "Simon / Richter";}

		if (charone.includes("/")) {
			var clonesplit = charone.split("/")[0].trim();
			var urlname = clonesplit.toLowerCase().replace(" & ", "-").replace(/ /g, "-").replace(/\./g, "")+"/";
		} else {
			var urlname = charone.toLowerCase().replace(" & ", "-").replace(/ /g, "-").replace(/\./g, "")+"/";
		}

		rp(url+urlname)
	 	.then(function(html){
			let $ = cheerio.load(html);
			for (var i = 0; i < $('.odd, .even').length; i++) {
				var name = $('.odd, .even')[i].children[3].children[0].children[0].data
				if (name == chartwo) {
					var mu = $('.odd, .even')[i].children[7].children[0].data;
					var mu2 = (Math.round((10 - mu) * 100)) / 100;
					if (mu2 == Math.round(mu2)) {
						mu2 = mu2+".0";
					}
					if (mu >= 5.2) {
						var color = "66ee66";
						var title = "Vorteilhaftes MU";
					}
					if (mu >= 4.9 && mu <= 5.1) {
						var color = "eeee22";
						var title = "Ausgeglichenes MU";
					}
					if (mu <= 4.8) {
						var color = "ee6666";
						var title = "Unvorteilhaftes MU";
					}
					const embed = new Discord.MessageEmbed()
						.setTitle(title)
						.setColor(color)
						.setAuthor("Eventhubs.com", "https://media.eventhubs.com/static/images/eventhubslogo1.png", "https://www.eventhubs.com/tiers/ssbu/")
						.setThumbnail("https://media.eventhubs.com/static/images/eventhubslogo1.png")
						.addField(charone+" vs. "+chartwo, mu+" - "+mu2)
						.setTimestamp()
					a.message.channel.send(embed);
					a.message.channel.stopTyping();
				}
			}
		})
  		.catch(function(err){
  		});
		a.message.channel.stopTyping();
	},

	info: {
		name: "matchup",
		description: "Zum Prüfen von Matchups zwischen zwei Charakteren",
		usage: "<Name1> + <Name2>",
		alias: ["mu"],
    category: "smash"
	}
};

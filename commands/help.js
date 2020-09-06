const Discord = require('discord.js')

module.exports = {
	execute(a) {
		const dev = a.client.users.cache.get("247271545234259968");
		const embed = new Discord.MessageEmbed()
		.setTitle("Befehle:")
		.setColor(0xA1FFFF)
		// .setThumbnail(a.client.user.avatarURL())
		.setFooter("Bot erstellt von @AutisticCrackhog#3414 | "+a.client.commands.size+" Befehle", dev.avatarURL());

    let categories = new Discord.Collection()
    .set("smash", [])
    .set("ninian", [])
    .set("divers", [])
    .set("text", [])
    .set("splatoon", [])
    .set("spiele", [])
    .set("daily", [])
    .set("feh", []);

		for (const x of a.client.commands.array()) {
      if (categories.has(x.info.category)) {
        categories.get(x.info.category).push(x);
      }
		}

    addEmbed("Ninian", "ninian");
    addEmbed("Textbasiert", "text");
    addEmbed("Spiele", "spiele");
    addEmbed("Smash Bros.", "smash");
    addEmbed("Splatoon", "splatoon");
    addEmbed("Fire Emblem Heroes", "feh");
    addEmbed("Täglich", "daily");
    addEmbed("Diverses", "divers");

		a.message.author.send(embed);
		a.message.reply("meine Befehle wurden in deine Direktnachrichten gesendet :blue_heart:")
			.then(msg => {
				msg.react("📬");
			}).catch(error => console.error(error));

    function addEmbed(name, categ) {
      embed.addField("__"+name+":__", "\u200b\n"+categories.get(categ).map(x => {
      let usage;
			typeof x.info.usage !== "undefined" ? usage = x.info.usage : usage = "";
      return `**-${x.info.name} ${usage}**\n*${x.info.description}*`
    }).join("\n")+"\n\u200b");
    }
	},

	info: {
		name: "help",
		description: "Ruft diese Liste auf",
		alias: ["?"],
    category: "ninian"
	}
};

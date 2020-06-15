const Discord = require('discord.js')

module.exports = {
	execute(a) {
		const dev = a.client.users.cache.get("247271545234259968");
		const embed = new Discord.MessageEmbed()
		.setTitle("Alle Befehle")
		.setColor(0xA1FFFF)
		.setThumbnail(a.client.user.avatarURL())
		.setFooter("Bot erstellt von @AutisticCrackhog#3414", dev.avatarURL());

		for (const x of a.client.commands) {
			var usage;
			typeof x[1].info.usage !== "undefined" ? usage = x[1].info.usage : usage = "";
			embed.addField(`-${x[1].info.name} ${usage}`, x[1].info.description);
		}
		a.message.author.send(embed);
		a.message.reply("meine Befehle wurden in deine Direktnachrichten gesendet :blue_heart:")
			.then(msg => {
				msg.react("📬");
			}).catch(error => console.error(error));
	},

	info: {
		name: "help",
		description: "Ruft diese Liste auf",
		alias: ["?"]
	}
};

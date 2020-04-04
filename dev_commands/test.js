const Discord = require("discord.js");

module.exports = {
	execute(a) {
		var url = "https://cdn.discordapp.com/emoji/553886650611138575.png"
		const embed = new Discord.RichEmbed()
		.setTitle("Alle Befehle")
		.setColor(0xA1FFFF)
		.setImage(url);
		a.message.channel.send(embed);
	},

	info: {
		name: "test",
		description: "test",
		alias: undefined
	}
};

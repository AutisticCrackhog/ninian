const Discord = require("discord.js");

module.exports = {
	execute(a) {
		if (a.args.length == 0) {
			a.message.channel.send("Keine Frage gestellt");
			return;
		}

		answers = [
			"Absolut nicht.",
			"Nein.",
			"Ich denke nicht.",
			"Ausgeschlossen.",
			"Wahrscheinlich nicht.",
			"Wahrscheinlich.",
			"Ja.",
			"Klar!",
			"Ganz sicher.",
			"Bestimmt.",
			"Schwer zu sagen.",
			"Frag doch einfach nochmal.",
			"Ich weiß nicht.",
			"Die Antwort ist doch offensichtlich.",
			"Vielleicht weiß Lord Eliwood darüber Bescheid!",
			"大丈夫！(^・^) \nMoment, du bist ja kein Weeb."
		]

		answer = answers[Math.floor(Math.random()*answers.length)];

		const embed = new Discord.RichEmbed()
	  .setColor(0xA1FFFF)
	  .setThumbnail("https://imgur.com/r3Oq6Wu.png")
	  .setFooter("Frage von "+a.message.author.username, a.message.author.avatarURL)
	  .addField("Frage:", a.args.join(" "))
	  .addField("Antwort:", answer)
	 a.message.channel.send(embed);
	},

	info: {
		name: "orakel",
		description: "Sieht deine Zukunft vorraus und beantwortet dir jede Frage",
		usage: "<Frage>",
		alias: undefined
	}
};

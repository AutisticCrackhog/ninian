const Discord = require("discord.js");

module.exports = {
	execute(a) {
    const embed = new Discord.MessageEmbed()
    .setTitle("Profil von "+a.message.author.username)
    .setColor("#FFFFFE")
    .setDescription("Durandollar: 500 \n")
    .setThumbnail("https://media.giphy.com/media/Q2DabV4eRh160/source.gif");
    a.message.channel.send(embed);
	},

	info: {
		name: "profil",
		description: "Zeigt dir dein Profil oder das Profil eines Nutzers an",
		alias: undefined,
    usage: "[@Nutzer]"
	}
};

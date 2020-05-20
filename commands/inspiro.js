const Discord = require("discord.js");
const rp = require("request-promise");

module.exports = {
	async execute(a) {
    a.message.channel.startTyping();
    rp("https://inspiroapi.glitch.me/get")
    .then(function(html) {
      var img = JSON.parse(html);
      const embed = new Discord.MessageEmbed()
      .setTitle("InspiroBot")
      .setURL("https://inspirobot.me/")
      .setColor("RANDOM")
      .setImage(img);
      a.message.channel.send(embed);
    });
    a.message.channel.stopTyping();
	},

	info: {
		name: "inspiro",
		description: "Zeigt dir eine von InspiroBots unendlichen Weisheiten",
		alias: undefined
	}
};

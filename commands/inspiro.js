const Discord = require("discord.js");
const rp = require("request-promise");

module.exports = {
	execute(a) {
    rp("https://inspirobot.me/api?generate=true")
    .then(function(html) {
      var img = JSON.parse('"'+html+'"');
      const embed = new Discord.MessageEmbed()
      .setTitle("InspiroBot")
      .setURL("https://inspirobot.me/")
      .setColor("RANDOM")
      .setImage(img);
      a.message.channel.send(embed);
    })
    .catch(e => {
      console.error(e);
    });
	},

	info: {
		name: "inspiro",
		description: "Zeigt dir eine von InspiroBots unendlichen Weisheiten",
		alias: undefined,
    category: "divers"
	}
};

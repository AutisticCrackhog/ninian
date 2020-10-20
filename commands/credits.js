const Discord = require("discord.js")

module.exports = {
	execute(a) { with(a) {
    let dense = client.users.cache.get("338075478118236160");
    let zaib = client.users.cache.get("232593220427710464");


    const embed = new Discord.MessageEmbed()
    .setTitle("Credits")
    .setColor("#A1FFFF")
    .addField("Kunst", 
      "**Profilbild** \n@"+dense.tag + "\n"
      + "**Emote: <:ninian:695011975390036079>** \n@"+dense.tag
    )
    .addField("Ideen", 
      zaib.tag
    )
    .addField("Daten und APIs", 
      "**-ascii** \nartii.herokuapp.com API \n"
      + "**-asian** \nAsian Charset von lingojam.com/JapaneseText \n"
      + "**-e2k** \nsljfaq.org/cgi/e2k.cgi \n"
      + "**-frames** \nDaten von ultimateframedata.com \n"
      + "**-inspiro** \ninspirobot.me API \n"
      + "**-iv** \nDaten von feheroes.gamepedia.com \n"
      + "**-matchup** \nDaten von eventhubs.com \n"
      + "**-modes** \nDaten von splatoon2.ink \n"
      + "**-waifu** \nDaten von animecharactersdatabase.com"
    )
    .addField("Bot", "Programmiert von @AutisticCrackhog#3414");
    message.channel.send(embed);
	}},

	info: {
		name: "credits",
		description: "Alle Mitbewirker des Bots",
		alias: undefined,
    usage: "",
    category: "divers"
	}
};

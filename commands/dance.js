const Discord = require("discord.js");
const fs = require("fs");
const DB = require("../db.js");

module.exports = {
	execute(a) {
    // ./data//dance.gif
    // https://cdn.glitch.com/4f29c3dc-c285-4fd6-804a-641a956f47ac%2Frefresh.gif?v=1587510247123
    let dances = new DB("./data/dances.json");
    let counter = dances.get("dances");
    counter++;

		a.message.channel.send(":dancer: \n Ich habe insgesamt für "+counter+" Leute getanzt.", {
			files: [
        {
          attachment: "https://cdn.glitch.com/4f29c3dc-c285-4fd6-804a-641a956f47ac%2Frefresh.gif",
          name: "ninian.gif"
        }
      ]
		});

    dances.set("dances", counter);
	},

	info: {
		name: "dance",
		description: "Lässt Ninian für dich tanzen",
		alias: undefined,
    category: "ninian"
	}
};

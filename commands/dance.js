const Discord = require("discord.js");
const fs = require("fs");
const { Client, MessageAttachment } = require('discord.js');

module.exports = {
	execute(a) {
		var contents = fs.readFileSync("./data/dances.json", (error) => {
			if (!!error) console.error(error);
		});
		var jsonContent = JSON.parse(contents);
		var counter = jsonContent.dances + 1
    // ./data//dance.gif
    // https://cdn.glitch.com/4f29c3dc-c285-4fd6-804a-641a956f47ac%2Frefresh.gif?v=1587510247123
    var attachment = new MessageAttachment("https://cdn.glitch.com/4f29c3dc-c285-4fd6-804a-641a956f47ac%2Frefresh.gif");
    attachment.name = "https://cdn.glitch.com/4f29c3dc-c285-4fd6-804a-641a956f47ac%2Frefresh.gif"
		a.message.channel.send(":dancer: \n Ich habe insgesamt für "+counter+" Leute getanzt.", {
			files: ["https://cdn.glitch.com/4f29c3dc-c285-4fd6-804a-641a956f47ac%2Frefresh.gif"]
		});

		var fileName = "./data/dances.json";
		var file = require("../data/dances.json");

		file.dances = counter;

		fs.writeFile(fileName, JSON.stringify(file), (error) => {
			if (!!error) console.error(error);
		});
	},

	info: {
		name: "dance",
		description: "Lässt Ninian für dich tanzen",
		alias: undefined
	}
};

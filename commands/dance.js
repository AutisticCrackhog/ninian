const Discord = require("discord.js");
const fs = require("fs");
const { Client, Attachment } = require('discord.js');

module.exports = {
	execute(a) {
		var contents = fs.readFileSync("./data/dances.json", (error) => {
			if (!isEmpty(error)) console.error(error);
		});
		var jsonContent = JSON.parse(contents);
		var counter = jsonContent.dances + 1

		const attachment = new Attachment("./data//dance.gif");
		a.message.channel.send(":dancer: \n Ich habe insgesamt für "+counter+" Leute getanzt.", {
			file: attachment
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

const Discord = require("discord.js");

module.exports = {
	async execute(a) {
    console.log(a.client.voice.connections);
	},

	info: {
		name: "test",
		description: "test",
		alias: undefined
	}
};

const Discord = require("discord.js");

module.exports = {
	async execute(a) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    a.message.channel.send("2s");
	},

	info: {
		name: "test",
		description: "test",
		alias: undefined
	}
};

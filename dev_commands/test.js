const Discord = require("discord.js");

module.exports = {
	execute(a) {
    console.log(a.client.connected);
	},

	info: {
		name: "test",
		description: "test",
		alias: undefined
	}
};

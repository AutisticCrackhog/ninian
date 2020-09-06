const Discord = require('discord.js');
const fs = require("fs");

module.exports = {
	execute(a) {
		a.client.commands = new Discord.Collection();
		const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
		for (const file of commandFiles) {
			if (typeof require.cache[require.resolve(`../commands/${file}`)] !== "undefined") {
				delete require.cache[require.resolve(`../commands/${file}`)];
			}
			const command = require(`../commands/${file}`);
			a.client.commands.set(command.info.name, command);
		}

		a.client.devcommands = new Discord.Collection();
		const devCommandFiles = fs.readdirSync('./dev_commands').filter(file => file.endsWith('.js'));
		for (const file of devCommandFiles) {
			delete require.cache[require.resolve(`../dev_commands/${file}`)];
			const command = require(`../dev_commands/${file}`);
			a.client.devcommands.set(command.info.name, command);
		}
		
		for (const u of Object.keys(util)) {
		  delete require.cache[require.resolve("../util/"+u+".js")];
		  util[u] = require("../util/"+u+".js");
		}
		
		console.log(`${a.client.commands.size} Commands und ${a.client.devcommands.size} Dev-Commands geladen.`);
    a.message.react("♻️");
		return [a.client.devcommands, a.client.commands];
	},

	info: {
		name: "reload",
		description: "Befehle reloaden",
		alias: undefined
	}
};

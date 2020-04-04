const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");

// NPM
const fs = require("fs");
const { Client, Attachment } = require('discord.js');
const request = require('request');
const rp = require('request-promise');
const cheerio = require('cheerio');

// Command Loading
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.info.name, command);
}

client.devcommands = new Discord.Collection();
const devCommandFiles = fs.readdirSync('./dev_commands').filter(file => file.endsWith('.js'));
for (const file of devCommandFiles) {
	const command = require(`./dev_commands/${file}`);
	client.devcommands.set(command.info.name, command);
}

// Variables
var dev;

client.once('ready', () => {
  dev = client.users.get("247271545234259968");
	console.log('Ninian ist bereit!');
	console.log(`${client.commands.size} Commands und ${client.devcommands.size} Dev-Commands geladen.`);
    client.user.setPresence({
        game: {
            name: "Tanzshows",
            type: "STREAMING"
        },
		status: "online"
    });
});

// Command Handler
client.on('message', message => {
  if (message.author.bot) return;
	if (message.guild === null) return;
  if (message.content.indexOf(config.prefix) === 0) {
	  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	  const command = args.shift().toLowerCase();

		// Normal Commands
	  if (client.commands.has(command)) {
	    try {
	      var value = client.commands.get(command).execute({message, args, client});
	      if (typeof value !== "undefined") {

	      }
	    } catch (error) {
				console.error(error);
	      message.channel.send("Dieser Befehl hat einen Fehler ausgelöst: \n\`\`\`"+error+"\`\`\`");
	    }
	  }

		// Developer Commands
	  if (client.devcommands.has(command) && message.author == dev) {
	    try {
	      var value = client.devcommands.get(command).execute({message, args, client});
	      if (typeof value !== "undefined") {
	        client.commands = value[1];
	        client.devcommands = value[0];
	      }
	    } catch (error) {
	      console.error(error);
	      message.channel.send("Dieser Befehl hat einen Fehler ausgelöst: \n\`\`\`"+error+"\`\`\`");
	    }
	  }
	} else {
		// Not Commands
		if (typeof(message.mentions.users.first()) !== "undefined") {
			const ninian = client.emojis.get("695011975390036079");
			if (message.mentions.users.first().id == "513436746080452641" && message.content.trim().length == "513436746080452641".length + 4) {
				message.channel.send("Ja? "+ninian);
			}
		}
	}
});

// Error Handler
client.on("error", (e) => {
	console.error(e);
});

// login
client.login(config.token);

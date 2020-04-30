const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");

// NPM
const fs = require("fs");
const { Client, Attachment } = require('discord.js');
const request = require('request');
const rp = require('request-promise');
const cheerio = require('cheerio');

const http = require('http');
const express = require('express');
const app = express();

app.use(express.static("public"));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/site/index.html");
});

app.get("/dance", (request, response) => {
  response.sendFile(__dirname + "/site/dance.html");
});
app.get("/dances", (request, response) => {
  var contents = fs.readFileSync("./data/dances.json", (error) => {
    if (!!error) console.error(error);
  });
  var jsonContent = JSON.parse(contents);
  var counter = jsonContent.dances + 1
  
  var fileName = "./data/dances.json";
  var file = require("./data/dances.json");

  file.dances = counter;

  fs.writeFile(fileName, JSON.stringify(file), (error) => {
    if (!!error) console.error(error);
  });
  response.json("\„Ich habe insgesamt für "+counter+" Leute getanzt.\“");
});

app.get("/refresh", (request, response) => {
  var data = [[],[],[]];
  const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    data[0].push("-"+command.info.name);
    data[1].push(command.info.description);
  }
  data[2].push(client.users.cache.get("247271545234259968").avatarURL());
  data[2].push(client.users.cache.get("338075478118236160").avatarURL());
  response.json(data);
});

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

// Command Loading
client.cmdAlias = new Discord.Collection();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.info.name, command);
  if (typeof command.info.alias != "undefined") {
    for (const al of command.info.alias) {
      client.cmdAlias.set(al, command.info.name);
    }
  }
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
  dev = client.users.cache.get("247271545234259968");
	console.log('Ninian ist bereit!');
	console.log(`${client.commands.size} Commands und ${client.devcommands.size} Dev-Commands geladen.`);
  client.user.setActivity("Tanzshows", {
		url: "https://twitch.tv/ninianbot",
		type: "STREAMING"
	});
  client.connected = false;
  client.play = (url) => {
    if (client.vc && client.connected) {
      client.vc.join()
      .then(connection => {
        connection.play(url);
      })
    }
  };
});

// Log server names and ID
client.on("guildCreate", guild => {
  var contents = fs.readFileSync("./data/guilds.json", (error) => {
    if (!!error) console.error(error);
  });
  var jsonContent = JSON.parse(contents);
  jsonContent.push({
    name: guild.name,
    id: guild.id,
    ownerid: guild.ownerID
  });
  
  var fileName = "./data/guilds.json";
  var file = require("./data/guilds.json");

  file = jsonContent;

  fs.writeFile(fileName, JSON.stringify(file, null, "  "), (error) => {
    if (!!error) console.error(error);
  });
});

// Command Handler
client.on('message', message => {
  if (message.author.bot) return;
	if (message.guild === null) return;
  if (message.content.indexOf(config.prefix) === 0) {
	  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	  var command = args.shift().toLowerCase();

		// Normal Commands
    if (client.cmdAlias.has(command)) {
      command = client.cmdAlias.get(command);
    }
    
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
	  else if (client.devcommands.has(command) && message.author == dev) {
	    try {
	      var value = client.devcommands.get(command).execute({message, args, client});
        console.log(value);
	      if (typeof value !== "undefined") {
          if (value.length == 2) {
            client.commands = value[1];
            client.devcommands = value[0];
          }
	      }
	    } catch (error) {
	      console.error(error);
	      message.channel.send("Dieser Befehl hat einen Fehler ausgelöst: \n\`\`\`"+error+"\`\`\`");
	    }
	  }
	} else {
		// Not Commands
		if (typeof(message.mentions.users.first()) !== "undefined") {
			const ninian = "<:ninian:695011975390036079>";
			if (message.mentions.users.first().id == "513436746080452641") {
				message.channel.send("Ja? "+ninian);
			}
		}
	}
});

// Update voice channel
client.on("voiceStateUpdate", (oldvs, newvs) => {
  if (client.vc) {
    if (client.vc.id == oldvs.channelID) {
      if (client.vc.members.size == 1) {
        client.connected = false;
        client.vc.leave();
        client.vc = undefined;
      }
    }
  }
})

// Error Handler
client.on("error", (e) => {
	console.error(e);
});

// login
client.login(process.env.TOKEN);

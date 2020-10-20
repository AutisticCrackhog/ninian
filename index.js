const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");

// NPM Packages
const fs = require("fs");
const { Client, Attachment } = require('discord.js');
const request = require('request');
const rp = require('request-promise');
const cheerio = require('cheerio');

// Custom Console
client.stdout = "";
global.oldConsole = console;
global["console"] = new console.Console(process.stdout);
global.socket = undefined;
console.log = function() {
  oldConsole.log(require("util").format.apply(this, arguments))
  client.stdout += require("util").format.apply(this, arguments) + '\n'
  io.emit("consoleUpdate", client.stdout);
}

// Express Zeugs und Website
const http = require('http');
const express = require('express');
const app = express();

app.use(express.static("public"));

// app.get("/", (request, response) => {
//   response.sendFile(__dirname + "/site/index.html");
// });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/site/new.html");
})

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
  response.json("\„Ich habe insgesamt für " + counter + " Leute getanzt.\“");
});

app.get("/refresh", (request, response) => {
  var data = [[], [], []];
  const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    data[0].push("-" + command.info.name);
    data[1].push(command.info.description);
  }
  data[2].push(client.users.cache.get("247271545234259968").avatarURL());
  data[2].push(client.users.cache.get("338075478118236160").avatarURL());
  response.json(data);
});

app.post("/online", () => {
  rp({
    method: "POST",
    uri: "https://maker.ifttt.com/trigger/online/with/key/imqLoseJEq680rfP0KfIrNPbuphFy4c5WDHxBSO2bIu",
    body: {
      value1: "Online!"
    },
    json: true
  })
    .then(function(parsedBody) {

    })
    .catch(function(err) {
      console.error(err);
    });
});

app.get("/control", (req, res) => {
  if (req.query.id !== undefined) {
    client.channels.cache.get(req.query.id).send(req.query.msg);
    res.json("OK");
    return;
  }
  res.sendFile(__dirname + "/site/control.html")
});

app.get("/controldata", (req, res) => {
  if (req.query.type == "guilddata") {
    var obj = {}
    client.guilds.cache.forEach(guild => {
      obj[guild.id] = {
        name: guild.name,
        id: guild.id,
        icon: guild.iconURL(),
        channels: {},
        members: {}
      };
      guild.channels.cache.forEach(channel => {
        obj[guild.id].channels[channel.id] = {
          name: channel.name,
          id: channel.id,
          type: channel.type
        }
      });
      guild.members.cache.forEach(member => {
        obj[guild.id].members[member.id] = {
          displayName: member.displayName,
          id: member.id
        }
      })
    });
    res.json(obj);
  }
  if (req.query.type == "msgdata") {
    var msgs = client.channels.cache.get(req.query.id).messages.cache;
    msgs.map(x => {
      x.username = x.author.username;
    })

    res.json(msgs.array());
  }
});

app.get("/console", (req, res) => {
  res.sendFile(__dirname + "/site/console.html")
})

app.get("/console/stdout", (req, res) => {
  res.json(client.stdout);
})

app.get("/console/clear", (req, res) => {
  client.stdout = "";
  console.log("Clear Request");
  res.json("OK");
})

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
});
setInterval(() => {
  http.get(`http://ninian--crackhog.repl.co/`);
}, 280000);

// Socket.io
var httpServer = require('http').createServer(app);
var io = require('socket.io')(httpServer);

io.on('connection', (socket) => {
  socket.emit("consoleUpdate", client.stdout);
  socket.on("clearConsole", () => {
    client.stdout = "";
    socket.emit("consoleUpdate", client.stdout);
    console.clear();
  })
});

httpServer.listen(3000, () => {
  console.log('Socket.io Port: 3000');
});

// Firebase
const admin = require("firebase-admin");
var serviceAccount = require("./firebaseCred.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ninianbot.firebaseio.com"
});
const db = admin.firestore();

// Custom Utilities
global.util = {};
let utils = fs.readdirSync("./util/");
for (const js of utils) {
  util[js.replace(".js", "")] = require("./util/" + js);
}

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

// Globale Variablen
var dev;

client.once('ready', () => {
  dev = client.users.cache.get("247271545234259968");
  console.log('Ninian ist bereit!');
  console.log(`${client.commands.size} Commands und ${client.devcommands.size} Dev-Commands geladen.`);
  client.user.setActivity("-help", {
    url: "https://twitch.tv/ninianbot",
    type: "STREAMING"
  });
  client.play = require("./play.js");
});

// Gejointe Server loggen
client.on("guildCreate", guild => {
  var contents = fs.readFileSync("./data/guilds.json", (error) => {
    if (!!error) console.error(error);
  });
  var jsonContent = JSON.parse(contents);
  jsonContent.push({
    name: guild.name,
    id: guild.id,
    ownerid: guild.ownerID,
    owner: client.users.cache.get(guild.ownerID).username,
    ownerDiscrim: client.users.cache.get(guild.ownerID).discriminator,
    date: new Date().getFullYear() + " " + new Date().getMonth() + " " + new Date().getDate()
  });

  var fileName = "./data/guilds.json";
  var file = require("./data/guilds.json");

  file = jsonContent;

  fs.writeFile(fileName, JSON.stringify(file, null, "  "), (error) => {
    if (!!error) console.error(error);
  });

  rp({
    method: "POST",
    uri: "https://maker.ifttt.com/trigger/joined/with/key/imqLoseJEq680rfP0KfIrNPbuphFy4c5WDHxBSO2bIu",
    body: {
      value1: guild.name
    },
    json: true
  })
    .then(function(parsedBody) {

    })
    .catch(function(err) {
      console.error(err);
    });
});

// Command Handler
client.on('message', message => {
  if (message.author.bot) return;
  if (message.guild === null) return;
  if (message.content.indexOf(config.prefix) === 0) {
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    var command = args.shift().toLowerCase();
    args.joined = message.content.slice(config.prefix.length).replace(command, "").trim();

    var toggle = JSON.parse(fs.readFileSync("./data/toggle.json"));

    if (toggle[message.guild.id]) {
      if (toggle[message.guild.id].indexOf(command) > -1) {
        return;
      }
    }

    // Delay von 20ms damit der Bot nie zuerst schreibt
    // Sowie ich Async verstanden habe, sollte das sogar nichts bewirken, aber mal sehen
    (async () => {
      await new Promise(resolve => setTimeout(resolve, 20))
    })();

    // Normale Commands
    if (client.cmdAlias.has(command)) {
      command = client.cmdAlias.get(command);
    }

    if (client.commands.has(command)) {

      // Command Usage in die Database eintragen lassen
      var counter = db.collection('CommandUsage').doc(command);
      counter.get().then(query => {
        if (query.exists) {
          query.data().usage++;
          counter.update({ usage: query.data().usage + 1 });
        } else {
          counter.set({ "usage": 1 })
        }
      })


      try {
        var value = client.commands.get(command).execute({ message, args, client });
        client.play(message.member, command);
        if (typeof value !== "undefined") {

        }
      } catch (error) {
        /* Colored Error Message
				console.log("\x1b[1m\x1b[31m%s\x1b[0m", error.message);
        console.log(error.stack.replace(error.message+"\n", "").replace("Error:", ""));
        */
        console.log(error)

        error.message += " (" + error.stack.match(/\w+\.js:[0-9]+:[0-9]+/)[0] + ")";
        message.channel.send("Dieser Befehl hat einen Fehler ausgelöst: \n\`\`\`" + error + "\`\`\`");
      }
    }

    // Developer Commands
    else if (client.devcommands.has(command) && message.author == dev) {
      try {
        var value = client.devcommands.get(command).execute({ message, args, client });
        if (typeof value !== "undefined") {
          if (value.length == 2) {
            client.commands = value[1];
            client.devcommands = value[0];
          }
        }
      } catch (error) {
        /* Colored Error Message
        console.log("\x1b[1m\x1b[31m%s\x1b[0m", error.message);
        console.log(error.stack.replace(error.message+"\n", "").replace("Error:", ""));
        */
        console.log(error)

        error.message += " (" + error.stack.match(/\w+\.js:[0-9]+:[0-9]+/)[0] + ")";
        message.channel.send("Dieser Befehl hat einen Fehler ausgelöst: \n\`\`\`" + error + "\`\`\`");
      }
    }
  } else {
    // Keine Commands
    if (typeof (message.mentions.users.first()) !== "undefined") {
      const ninian = "<:ninian:695011975390036079>";
      if (message.mentions.users.first().id == "513436746080452641") {
        message.channel.send("Ja? " + ninian);
      }
    }
  }
});

// Voice Channel Event
client.on("voiceStateUpdate", (oldvs, newvs) => {
  client.voice.connections.forEach((value, key) => {
    if (value.channel.members.size === 1 && value.channel.members.first().user.id === client.user.id) {
      value.channel.leave();
    }
  });
});

// Error Handler
client.on("error", (e) => {
  console.error(e);
});

// Login
client.login(process.env.TOKEN);
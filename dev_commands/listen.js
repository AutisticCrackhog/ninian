const fs = require("fs");
const Discord = require("discord.js");

module.exports = {
	execute(a) { with(a) {

    let cons = client.voice.connections.map(con => {
      return {
        id: con.channel.id,
        channel: con.channel,
        guild: con.channel.guild
      }
    })

    if (args[0] == "connections" || args[0] == "cons") {
      const embed = new Discord.MessageEmbed()
      .setColor("#fefefe")
      .setTitle("Voice Connections");
      cons.forEach((con, i) => {
        embed.addField(i+":", con.channel.name + " - " + con.guild.name);
      });
      message.channel.send(embed);
      return;
    }

    let varRegex = /{\S+}/g;
    let matches = args.joined.match(varRegex);
    if (matches) {
      matches.forEach(match => {
        try {
          let evaluated = eval(match.slice(1, -1))
          args.joined = args.joined.replace(match, evaluated);
        } catch(e) {
          console.log(e);
          message.channel.send("Fehlerhaftes JS");
          return;
        }
      })
    }

    args = args.joined.split(" ");

    let fromChannel = client.channels.cache.get(args[0]);
    let toChannel = client.channels.cache.get(args[1]);
    let userID = args[2];
    let ms = args[3];

    if (!fromChannel || !toChannel) {
      message.channel.send("Error: Keine Channels \n```(fromChannel, toChannel, userID, [ms = 10000])```");
      return;
    }
    if (!ms) ms = 10000;

    if (fromChannel.members.has(userID)) {
      if (!client.voice.connections.find(x => x.channel.id == fromChannel.id)) {
        message.channel.send("Error: Nicht mit fromChannel verbunden");
        return;
      }
      let stream = client.voice.connections.find(x => x.channel.id == fromChannel.id).receiver.createStream(userID, {
        end: "manual"
      });

      if (!client.voice.connections.find(x => x.channel.id == toChannel.id)) {
        message.channel.send("Error: Nicht mit toChannel verbunden");
      }
      let dispatcher = client.voice.connections.find(x => x.channel.id == toChannel.id).play(stream, {
        type: "opus"
      });

      setTimeout(() => {
        dispatcher.end();
      }, ms)
    }
	}},

	info: {
		name: "listen",
		description: "",
		alias: undefined,
    usage: "",
    category: ""
	}
};

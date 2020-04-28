const fs = require("fs");
const ytdl = require('ytdl-core');

module.exports = {
	execute(a) {
		if (typeof a.message.member.voice.channel === "undefined") {
			a.message.channel.send("Du bist in keinem Voice Channel");
			return;
		}
		var vc = a.message.member.voice.channel;
		vc.join()
		.then(connection => {
      a.client.connected = true;
      a.client.vc = vc;
      switch (Math.floor (Math.random()*2) + 1) {
        case 1:
          connection.play("https://cdn.glitch.com/4f29c3dc-c285-4fd6-804a-641a956f47ac%2FVOICE_Ninian_Oracle_of_Destiny_MAP_1.wav");
          break;
        case 2:
          connection.play("https://cdn.glitch.com/4f29c3dc-c285-4fd6-804a-641a956f47ac%2FVOICE_Ninian_Oracle_of_Destiny_MAP_2.wav?v=1587679859796");
          break;
      }
		})
		.catch(err => console.log(err));

	},

	info: {
		name: "join",
		description: "Führe Unterhaltungen mit Ninian",
		alias: undefined
	}
};

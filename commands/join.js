const fs = require("fs");
const ytdl = require('ytdl-core');

module.exports = {
	execute(a) {
		if (a.message.member.voice.channel === null) {
			a.message.channel.send("Du bist in keinem Voice Channel");
			return;
		}
		a.message.member.voice.channel.join()
		.then(connection => {
      switch (Math.floor (Math.random()*2) + 1) {
        case 1:
          connection.play("https://cdn.glitch.com/4f29c3dc-c285-4fd6-804a-641a956f47ac%2FVOICE_Ninian_Oracle_of_Destiny_MAP_1.wav");
          break;
        case 2:
          connection.play("https://cdn.glitch.com/4f29c3dc-c285-4fd6-804a-641a956f47ac%2FVOICE_Ninian_Oracle_of_Destiny_MAP_2.wav?v=1587679859796");
          break;
      }
    });
      

	},

	info: {
		name: "join",
		description: "Führe Unterhaltungen mit Ninian",
		alias: undefined,
    category: "ninian"
	}
};

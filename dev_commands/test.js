const Discord = require("discord.js");
const cheerio = require("cheerio");
const rp = require("request-promise");
const fetch = require("node-fetch")

module.exports = {
	async execute({client, message, args}) {
    /*
    let id = "247271545234259968";
    fetch("https://discordapp.com/api/users/"+id, {
      method: "GET",
      headers: {
        Authorization: "Bot NTEzNDM2NzQ2MDgwNDUyNjQx.W_BtOw.8viMWRhOJ6wFQB9ASnwXaxu0LAk"
      }
    })
    .then(res => res.json())
    .then(json => console.log(json));
    */

    if (command == "!hallo") {
      message.channel.send("Hallo");
    }
    
  },

	info: {
		name: "test",
		description: "test",
		alias: undefined
	}
};

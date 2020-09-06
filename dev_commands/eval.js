const Discord = require("discord.js");
const fs = require("fs");
const rp = require("request-promise");
const cheerio = require("cheerio");

module.exports = {
	async execute(a) { with(a) {
	  this.log = function(any) {
	    if (typeof any == "object" || typeof any == "string") any = JSON.stringify(any, null, 2)
      if (typeof any == "undefined") any = "undefined";
	    message.channel.send(any)
      .catch(err => {
        message.channel.send(err.message);
      })
	  }
    try {
      let evaluated = eval(args.join(' '));
      this.log(evaluated);
    } catch (err) {
      message.channel.send(err.message)
    }
    
	}},

	info: {
		name: "eval",
		description: "",
		alias: undefined
	}
};

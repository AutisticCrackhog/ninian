const rp = require("request-promise");

module.exports = {
	execute: async (a) => {
    var eliwood = await a.message.channel.createWebhook("Eliwood", {
      avatar: "https://cdn.discordapp.com/attachments/390538589873635331/730582863166308383/20200709_023519.png",
      reason: "Ich will halt reden"
    });
    a.message.channel.send("Lord Eliwood?").then(() => {
      rp({
        method: "POST",
        uri: eliwood.url,
        body: {
          content: "Ja?"
        },
        json: true
      })
      .then(function (parsedBody) {
        a.message.channel.send("💙");
        eliwood.delete();
      })
      .catch(function (err) {
        console.error(err); 
      });

    });
	},

	info: {
		name: "eliwood",
		description: "",
		alias: undefined
	}
};

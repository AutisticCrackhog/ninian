const rp = require("request-promise");
const cheerio = require("cheerio");

module.exports = {
	execute: async (a) => {
    if (!a.args[0]) {
      a.message.channel.send("```-e2k <Englisch>```");
      return;
    }

    const res = await rp("https://www.sljfaq.org/cgi/e2k.cgi?word="+encodeURI(a.args.join(" ")));
    const $ = cheerio.load(res);

    var output = $("#katakana-string").text();
    a.message.channel.send(output);
	},

	info: {
		name: "e2k",
		description: "Wandelt Englische Wörter zu Katakana um",
		alias: undefined,
    usage: "<Englisch>",
    category: "text"
	}
};

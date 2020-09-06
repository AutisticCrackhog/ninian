const rp = require("request-promise");

module.exports = {
	execute(a) {
    if (!a.args[0]) {
      a.message.channel.send("Es muss ein Text angegeben werden, der umgewandelt werden soll \n```-ascii <Text>```");
      return;
    }
    
    var uri = encodeURI(a.args.join(" "));
    rp("http://artii.herokuapp.com/make?text="+uri)
    .then(res => {
      if (("```\n"+res+"```").length > 2000) {
        a.message.channel.send("Das Ascii Art hat zu viele Zeichen (2000+ Zeichen)");
        return;
      }
      a.message.channel.send("```\n"+res+"```");
    });
    
	},

	info: {
		name: "ascii",
		description: "Wandelt Text in Ascii-Art um",
		alias: undefined,
    usage: "<Text>",
    category: "text"
	}
};


module.exports = {
	execute(a) {
    const characters = {"0":"0","1":"1","2":"2","3":"3","4":"4","5":"5","6":"6","7":"7","8":"8","9":"9","a":"卂","b":"乃","c":"匚","d":"ᗪ","e":"乇","f":"千","g":"Ꮆ","h":"卄","i":"丨","j":"ﾌ","k":"Ҝ","l":"ㄥ","m":"爪","n":"几","o":"ㄖ","p":"卩","q":"Ɋ","r":"尺","s":"丂","t":"ㄒ","u":"ㄩ","v":"ᐯ","w":"山","x":"乂","y":"ㄚ","z":"乙","A":"卂","B":"乃","C":"匚","D":"ᗪ","E":"乇","F":"千","G":"Ꮆ","H":"卄","I":"丨","J":"ﾌ","K":"Ҝ","L":"ㄥ","M":"爪","N":"几","O":"ㄖ","P":"卩","Q":"Ɋ","R":"尺","S":"丂","T":"ㄒ","U":"ㄩ","V":"ᐯ","W":"山","X":"乂","Y":"ㄚ","Z":"乙"};
    var text = a.args.join(" ");
    var output = "";
    for (const char of text.split("")) {
      if (typeof characters[char] !== "undefined") {
        output += characters[char];
      } else {
        output += char;
      }
    }
    a.message.channel.send(output);
	},

	info: {
		name: "asian",
		description: "Wandelt die Buchstaben eines Textes zu asiatischen Buchstaben um",
		alias: undefined,
		usage: "<Text>",
    category: "text"
	}
};

module.exports = {
	execute(a) {
		var kneemotes = [];
		var n = 1;
		while (n <= 48) {
			if (n < 10) {
				kneemotes.push(
					a.client.emojis.find(emoji => emoji.name == n+"_").toString()
				);
				if (lineb(n)) {
					kneemotes.push("\n");
				}
			} else {
				kneemotes.push(
					a.client.emojis.find(emoji => emoji.name == n).toString()
				);
				if (lineb(n)) {
					kneemotes.push("\n");
				}
			}
		n++;
		}
		a.message.channel.send(kneemotes.join(''));

		function lineb(n) {
			if (n / 8 == Math.round(n / 8)) {
				return true;
			} else {
				return false;
			}
		}
	},

	info: {
		name: "kneemotes",
		description: "Schau es dir einfach selbst an",
		alias: undefined
	}
};

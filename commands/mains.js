const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
	execute(a) {
		const file = require("../data/mains.json");
		const autocorrect = require("autocorrect")({words: file.list});
		var mainsuser = a.message.author;

		if (typeof(a.args[0]) === "undefined") {
			if (typeof(file[mainsuser.id]) == "undefined") {
				const embed = new Discord.MessageEmbed()
				 .setTitle("Mains von: "+mainsuser.username)
	   	.setColor(0xA1FFFF)
	   	.setThumbnail(mainsuser.avatarURL())
	   	.addField("Mains:", "--")
	   	.addField("Secondaries:", "--")
	   a.message.channel.send(embed);
				return;
			}

		 var mains = file[mainsuser.id].mains;
			var secondaries = file[mainsuser.id].secondaries;

			if (mains.length == 0 && secondaries.length == 0) {
			 const embed = new Discord.MessageEmbed()
				 .setTitle("Mains von: "+mainsuser.username)
	   	.setColor(0xA1FFFF)
	   	.setThumbnail(mainsuser.avatarURL())
	   	.addField("Mains:", "--")
	   	.addField("Secondaries:", "--")
	   a.message.channel.send(embed)
				return;
			}
			if (mains.length == 0) {
				mains = "--";
			}
			if (secondaries.length == 0) {
				secondaries = "--";
			}

			const embed = new Discord.MessageEmbed()
		  .setTitle("Mains von: "+mainsuser.username)
	  	.setColor(0xA1FFFF)
	  	.setThumbnail(mainsuser.avatarURL())
	   .addField("Mains:", mains)
	   .addField("Secondaries:", secondaries)
	  a.message.channel.send(embed);
	  return;
		}

		if (a.args[0].startsWith("<@")) {
			var mainsuser = a.message.mentions.users.first();


			if (typeof(file[mainsuser.id]) === "undefined") {
				const embed = new Discord.MessageEmbed()
				 .setTitle("Mains von: "+mainsuser.username)
	   	.setColor(0xA1FFFF)
	   	.setThumbnail(mainsuser.avatarURL())
	   	.addField("Mains:", "--")
	   	.addField("Secondaries:", "--")
	   a.message.channel.send(embed);
				return;
			}

			var mains = file[mainsuser.id].mains;
			var secondaries = file[mainsuser.id].secondaries;

			if (mains.length == 0 && secondaries.length == 0) {
			 const embed = new Discord.MessageEmbed()
				 .setTitle("Mains von: "+mainsuser.username)
	   	.setColor(0xA1FFFF)
	   	.setThumbnail(mainsuser.avatarURL())
	   	.addField("Mains:", "--")
	   	.addField("Secondaries:", "--")
	   a.message.channel.send(embed)
				return;
			}
			if (mains.length == 0) {
				mains = "--";
			}
			if (secondaries.length == 0) {
				secondaries = "--";
			}

			const embed = new Discord.MessageEmbed()
		  .setTitle("Mains von: "+mainsuser.username)
	  	.setColor(0xA1FFFF)
	  	.setThumbnail(mainsuser.avatarURL())
	   .addField("Mains:", mains)
	   .addField("Secondaries:", secondaries)
	  a.message.channel.send(embed);

		}

		if (a.args[0] == "list") {
			a.message.channel.send("```\n Alle Charaktere: \n"+file.list.join(", ")+"```");
			return;
		}

	 if (a.args[0].toLowerCase() == "add" || a.args[0].toLowerCase() == "a") {
	 	if (typeof(file[a.message.author.id]) === "undefined") {
	 		file[a.message.author.id] = {
	 			"mains": [],
	 			"secondaries": []
	 	};
	 }
	  if (a.args[1].toLowerCase() == "main" || a.args[1].toLowerCase() == "m") {
	  	if (typeof(a.args[2]) === "undefined") {
	  		a.message.channel.send("Charakter wurde nicht gefunden. \n\"-mains list\" für eine Liste aller Charaktere");
	  		return;
	  	}

	  	var chara = [];
	  	var n = 2;
	  	while (typeof(a.args[n]) !== "undefined") {
	  		chara.push(a.args[n]);
	  		n++
	  	}
	  	var chara = autocorrect(chara.join(" "));


	  		var maxcount = file.list.length;
	  		var i = 0;

	  		while (i <= maxcount) {
	  			if (file.list[i] == chara) {
	  				i = file.list.length + 1;

	  			file[a.message.author.id].mains = file[a.message.author.id].mains.filter(item => item !== chara);
	  				file[a.message.author.id].mains.push(chara);
	  				a.message.channel.send(chara+" wurde zu deinen Mains hinzugefügt!")

	  			} else {
	  				i++
	  			}
	  		}
	  		var maxcount = file.alias.length;
	  		var i = 0;
	  		while (i <= maxcount) {
	  			// if (file.alias[i] == chara) {
					if (false) {
	  				i++
	  				var aliasnumber = file.alias[i];
	  				chara = file.list[aliasnumber];
	  				i = maxcount + 1;

	  				file[a.message.author.id].mains = file[a.message.author.id].mains.filter(item => item !== chara);
	  				file[a.message.author.id].mains.push(chara);
	  				a.message.channel.send(chara+" wurde zu deinen Mains hinzugefügt!");

	  			} else {
	  				i = i + 2;
	  			}
	  		}
	  }

	  if (a.args[1].toLowerCase() == "secondary" || a.args[1].toLowerCase() == "s") {
	  	if (typeof(a.args[2]) === "undefined") {
	  		a.message.channel.send("Charakter wurde nicht gefunden. \n\"-mains list\" für eine Liste aller Charaktere");
	  		return;
	  	}

	  	var chara = [];
	  	var n = 2;
	  	while (typeof(a.args[n]) !== "undefined") {
	  		chara.push(a.args[n]);
	  		n++
	  	}
	  	var chara = autocorrect(chara.join(" "));


	  		var maxcount = file.list.length;
	  		var i = 0;

	  		while (i <= maxcount) {
	  			if (file.list[i] == chara) {
	  				i = file.list.length + 1;

	  				file[a.message.author.id].secondaries = file[a.message.author.id].secondaries.filter(item => item !== chara);
	  				file[a.message.author.id].secondaries.push(chara);
	  				a.message.channel.send(chara+" wurde zu deinen Secondaries hinzugefügt!");

	  			} else {
	  				i++
	  			}
	  		}
	  		var maxcount = file.alias.length;
	  		var i = 0;
	  		while (i <= maxcount) {
	  			// if (file.alias[i] == chara) {
					if (false) {
	  				i++
	  				var aliasnumber = file.alias[i];
	  				chara = file.list[aliasnumber];
	  				i = maxcount + 1;

	  				file[a.message.author.id].secondaries = file[a.message.author.id].secondaries.filter(item => item !== chara);
	  				file[a.message.author.id].secondaries.push(chara);
	  				a.message.channel.send(chara+" wurde zu deinen Secondaries hinzugefügt!");

	  			} else {
	  				i = i + 2;
	  			}
	  		}
	  }


	  fs.writeFile("./data/mains.json", JSON.stringify(file, null, "  "), (error) => {  if (!!error) console.error(error); });
	 }

	 if (a.args[0].toLowerCase() == "remove" || a.args[0].toLowerCase() == "r") {
	 	if (a.args[1].toLowerCase() == "main" || a.args[1].toLowerCase() == "m") {

	 		if (typeof(file[a.message.author.id]) === "undefined") {
	 	a.message.channel.send("Dieser Charakter ist nicht dein Main.")
	 	return;
	   }

	 		var chara = [];
	  	var n = 2;
	  	while (typeof(a.args[n]) !== "undefined") {
	  		chara.push(a.args[n]);
	  		n++
	  	}
	  	var chara = autocorrect(chara.join(" "));


	  	var maxcount = file[a.message.author.id].mains.length;
	  	var i = 0;

	  	while (i <= maxcount) {
	  		if (file[a.message.author.id].mains[i] == chara) {
			 		i = file.list.length + 1;
	  			file[a.message.author.id].mains = file[a.message.author.id].mains.filter(item => item !== chara);
	  			a.message.channel.send(chara+" wurde aus deinen Mains entfernt.");
	  			fs.writeFile("./data/mains.json", JSON.stringify(file, null, "  "), (error) => {  if (!!error) console.error(error); });
	  			return;
	  			} else {
	  				i++
	  			}
	   }
	   var maxcount = file.alias.length;
	  		var i = 0;
	  		while (i <= maxcount) {
	  			// if (file.alias[i] == chara) {
					if (false) {
	  				i++
	  				var aliasnumber = file.alias[i];
	  				chara = file.list[aliasnumber];
	  				i = maxcount + 1;

	  				file[a.message.author.id].mains = file[a.message.author.id].mains.filter(item => item !== chara);
	  			a.message.channel.send(chara+" wurde aus deinen Mains entfernt.");
	  				fs.writeFile("./data/mains.json", JSON.stringify(file, null, "  "), (error) => {  if (!!error) console.error(error); });
	  			return;
	  			} else {
	  				i = i + 2;
	  			}
	  		}


	  	a.message.channel.send("Dieser Charakter ist nicht dein Main.")
	 	  return;

	 	}
	 	if (a.args[1].toLowerCase() == "secondary" || a.args[1].toLowerCase() == "s") {

	 		if (typeof(file[a.message.author.id]) === "undefined") {
	 	a.message.channel.send("Dieser Charakter ist nicht dein Secondary.")
	 	return;
	   }

	 		var chara = [];
	  	var n = 2;
	  	while (typeof(a.args[n]) !== "undefined") {
	  		chara.push(a.args[n]);
	  		n++
	  	}
	  	var chara = autocorrect(chara.join(" "));


	  	var maxcount = file[a.message.author.id].secondaries.length;
	  	var i = 0;

	  	while (i <= maxcount) {
	  		if (file[a.message.author.id].secondaries[i] == chara) {
			 		i = file.list.length + 1;
	  			file[a.message.author.id].secondaries = file[a.message.author.id].secondaries.filter(item => item !== chara);
	  			a.message.channel.send(chara+" wurde aus deinen Secondaries entfernt.");
	  			fs.writeFile("./data/mains.json", JSON.stringify(file, null, "  "), (error) => {  if (!!error) console.error(error); });
	  			return;
	  			} else {
	  				i++
	  			}
	   }
	   var maxcount = file.alias.length;
	  		var i = 0;
	  		while (i <= maxcount) {
	  			// if (file.alias[i] == chara) {
					if (false) {
	  				i++
	  				var aliasnumber = file.alias[i];
	  				chara = file.list[aliasnumber];
	  				i = maxcount
	  			a.message.channel.send(chara+" wurde aus deinen Secondaries entfernt.");
	  				fs.writeFile("./data/mains.json", JSON.stringify(file, null, "  "), (error) => {  if (!!error) console.error(error); });
	  			return;
	  			} else {
	  				i = i + 2;
	  			}
	  		}



	  	a.message.channel.send("Dieser Charakter ist nicht dein Secondary.")
	 	  return;

	 	}
	 }
	},

	info: {
		name: "mains",
		description: "Zeigt die Mains und Secondaries von Nutzern an und legt eigene Mains fest",
		usage: "[list / @Nutzer / Leer] / <add / remove> <main / secondary> <Charaktername aus -mains list> ",
		alias: ["m"]
	}
};

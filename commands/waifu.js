const Discord = require('discord.js');
const request = require('request');
const rp = require('request-promise');
const cheerio = require('cheerio');
const fs = require("fs");
const seedrandom = require("seedrandom");

module.exports = {
	execute(a) {
    var waifus = JSON.parse(fs.readFileSync("./data/waifus.json"))
    
    if (typeof a.args[0] !== "undefined") {
      if (a.args[0] == "favs") {
        if (typeof a.message.mentions.users.first() !== "undefined") a.message.author = a.message.mentions.users.first();
          
        const embed = new Discord.MessageEmbed()
        .setTitle(`${a.message.author.username}\'s Favoriten `)
        .setColor("RANDOM")

        if (waifus[a.message.author.id]) {
          embed.setFooter(`(${waifus[a.message.author.id].length}/7)`, "https://127.0.0.1/");

          var des = "";
          for (const w of waifus[a.message.author.id]) {
            des += w+"\n";
          }
          embed.setDescription(des)
        } else {
          embed.setFooter("(0/7)", "https://127.0.0.1/")
        }
        a.message.channel.send(embed);
      } else if (a.args[0] == "remove") {
        if (typeof a.args[1] === "undefined") { a.message.channel.send("Es wurde keine Waifu angeben \n`-waifu remove <Name>`"); return; }
        
        var waifuname = a.args.join(" ").replace(a.args[0], "").trim();
        
        if (waifus[a.message.author.id]) {
          var index = waifus[a.message.author.id].indexOf(waifuname);
          if (index > -1) {
            waifus[a.message.author.id].splice(index, 1);
            a.message.channel.send(waifuname +" wurde aus deinen Favoriten entfernt");
          } else {
            a.message.channel.send(waifuname+" konnte nicht gefunden werden");
          }
        } else {
          a.message.channel.send(waifuname+" konnte nicht gefunden werden");
        }
      }
      
      fs.writeFileSync('./data/waifus.json', JSON.stringify(waifus, null, 2));
      return;
    }
    
		var waifucount = 101759;
		var url = "https://www.animecharactersdatabase.com/mobile_character.php?id=";
		var id = Math.floor(Math.random()*waifucount) + 1;
    // if (a.message.author.id == "247271545234259968") 
    if (typeof a.args[0] !== "undefined") id = a.args[0];
    url = url + id;

		rp(url)
			.then(function(html) {
				var $ = cheerio.load(html);

				var name = $('meta[property="og:title"]').attr("content");
				var anime = $('meta[property="og:description"]').attr("content").split("is a character from ")[1].trim();
        var image = $('meta[property="og:image"]').attr("content");
        if (image.indexOf(".") === 1) {
					image = "/" + image.substring(3);
				}
        image = "https://www.animecharactersdatabase.com" + image;
				var image2 = $($("p a:has(img)").get("0")).attr("href");
				if (image2.indexOf(".") === 1) {
					image2 = "/" + image2.substring(3);
				}
				image2 = "https://www.animecharactersdatabase.com" + image2;
      
        var rng = seedrandom(a.message.author.id);
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(rng() * 16)];
        }

				const embed = new Discord.MessageEmbed()
					.setTitle(name + " (Vollbild)")
					.setDescription(anime)
					.setImage(image)
					.setColor(color)
					.setFooter("ID: "+id+" | animecharactersdatabase.com \nReagiere, um die Waifu zu favorisieren", "https://127.0.0.1/")
					.setURL(image2)
        
        
				a.message.channel.send("Deine neue Waifu wird", {embed: embed})
        .then(msg => {
          msg.react(":bridal_ninian:696135390674944010");
          
          const filter = (reaction, user) => {
            console.log([reaction.emoji.name === 'bridal_ninian', user.id])
            return reaction.emoji.name === 'bridal_ninian' && user.id === a.message.author.id;
          };

          const collector = msg.createReactionCollector(filter, { max: 1, time: 15000 });
          
          collector.on('collect', (reaction, reactionCollector) => {
            if (waifus[a.message.author.id]) {
              if (waifus[a.message.author.id].length < 7) {
                waifus[a.message.author.id].push(name);
                a.message.channel.send(name+" wurde zu deinen Favoriten hinzugefügt! ("+waifus[a.message.author.id].length+"/7)");
              } else {
                a.message.channel.send("🚫 "+name+" konnte nicht hinzugefügt werden. (7/7)")
              }
            } else {
              waifus[a.message.author.id] = [];
              waifus[a.message.author.id].push(name);
              a.message.channel.send(name+" wurde zu deinen Favoriten hinzugefügt! (1/7)");
            }
            fs.writeFileSync('./data/waifus.json', JSON.stringify(waifus, null, 2));
          });
          
        })
			})
      .catch(() => {
      a.message.channel.send("Konnte keine Verbindung zu `animecharactersdatabase.com` herstellen")
    });
	},

	info: {
		name: "waifu",
		description: "Sucht dir eine neue Waifu aus",
    usage: "[favs / remove] [@Nutzer / Waifu]",
		alias: ["w"]
  }
};
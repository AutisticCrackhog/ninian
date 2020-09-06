const { MessageEmbed } = require("discord.js");
const rp = require("request-promise");
const cheerio = require("cheerio");

module.exports = {
	execute: async function(a) { with(a) {
    if (!args[0]) {
      message.channel.send("Kein Charakter angegeben \n```-iv <Name>```")
      return;
    }

    args = args.map(x => x.charAt(0).toUpperCase() + x.slice(1));
    let search = args.join(" ");

    let hero = {};
    let html;
    try {
      html = await rp("https://feheroes.gamepedia.com/"+search);
    } catch(e) {
      message.channel.send('"'+search+'" wurde nicht gefunden');
      return;
    }

    let $ = cheerio.load(html);

    if ($("#disambig").length == 1) {
      let data = $("ul", "#mw-content-text").children("li").map((i, el) => {
        return $(el).children("span").children().first().get()
      }).toArray();

      let foundText = `${data.length} Charaktere wurden gefunden: \n`;
      for (const i in data) {
        foundText += "`["+ (parseInt(i)+1) +"]`:  " + data[i].attribs.title + "\n";
      }
      foundText += "Wähle einen Charakter mithilfe der Zahlen aus"
      
      let msg = await message.channel.send(foundText);
      
      const filter = m => m.author.id == message.author.id;
      const collector = msg.channel.createMessageCollector(filter, {
        time: 15000,
        max: 1
      });
      
      collector.on("collect", m => {
        let num = parseInt(m);
        if (isNaN(num) || !data[num-1]) {
          message.channel.send("Es muss eine gültige Nummer angeben werden");
          return;
        }

        [hero.name, hero.title] = data[num-1].attribs.title.split(":").map(x => x.trim());
        hero.imageURL = $(`a[title="${data[num-1].attribs.title}"] img`).attr("src").split(".webp")[0]+".webp";

        scrapeStats("https://feheroes.gamepedia.com"+data[num-1].attribs.href);
      })
      return;
    }

    let data = $("h2:has(#Units) + div").children().toArray().map((el) => {
      return $(el).children().children().first().children().get(2).attribs
    })

    if (data.length == 1) {
      [hero.name, hero.title] = data[0].title.split(":").map(x => x.trim());
      hero.imageURL = $(`a[title="${data[0].title}"] img`).attr("src");

      scrapeStats("https://feheroes.gamepedia.com"+data[0].href);
      return;
    }

    let foundText = `${data.length} Charaktere wurden gefunden: \n`;
    for (const i in data) {
      foundText += "`["+ (parseInt(i)+1) +"]`:  " + data[i].title + "\n";
    }
    foundText += "Wähle einen Charakter mithilfe der Zahlen aus"
    
    let msg = await message.channel.send(foundText);

    const filter = m => m.author.id == message.author.id;
    const collector = msg.channel.createMessageCollector(filter, {
      time: 15000,
      max: 1
    });
    
    collector.on("collect", m => {
      let num = parseInt(m);
      if (isNaN(num) || !data[num-1]) {
        message.channel.send("Es muss eine gültige Nummer angeben werden");
        return;
      }

      [hero.name, hero.title] = data[num-1].title.split(":").map(x => x.trim());
      hero.imageURL = $(`a[title="${data[num-1].title}"] img`).attr("src");

      scrapeStats("https://feheroes.gamepedia.com"+data[num-1].href)
    })

    async function scrapeStats(url) {
      let html = await rp(url);
      const $ = cheerio.load(html);

      let data = $($("h3:has(#Level_40_stats) ~ table tbody").children().get(5)).children().toArray().map(x => {
        return x.children
      });

      data.splice(0, 1);
      data = data.flat();

      hero.hp = data[0].data
      hero.atk = data[1].data
      hero.spd = data[2].data
      hero.def = data[3].data
      hero.res = data[4].data
      hero.bst = data[5].data

      hero.weapon = $($("table.hero-infobox tbody tr:has(th:contains('Weapon Type'))").children().get(1)).children().get(1).attribs.title;
      hero.move = $($("table.hero-infobox tbody tr:has(th:contains('Move Type'))").children().get(1)).children().get(1).attribs.title;

      let embed = new MessageEmbed()
      .setTitle(hero.name + ": " + hero.title)
      .setURL(url)
      .setColor("RANDOM")
      .setThumbnail(hero.imageURL)
      .addField(
        "Level 40 Stats",
        "HP - `" + hero.hp + "`\n"
        + "ATK -  `" + hero.atk + "`\n"
        + "SPD -  `" + hero.spd + "`\n"
        + "DEF -  `" + hero.def + "`\n"
        + "RES -  `" + hero.res + "`\n"
        + "BST -  `" + hero.bst + "`"
      )
      .setFooter("Daten von feheroes.gamepedia.com");
      message.channel.send(embed);
    }
	}},

	info: {
		name: "iv",
		description: "Zeigt die IVs von Charakteren an",
		alias: ["ivs"],
    usage: "<Name>",
    category: "feh"
	}
};

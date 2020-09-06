const Discord = require("discord.js");

const fs = require("fs");

const { createCanvas, loadImage } = require('canvas');

const splatoon = require("splatoon2.ink.js")
const client = new splatoon.Client("en");

module.exports = {
	execute(a) {
    a.message.channel.startTyping();

    var json = JSON.parse(fs.readFileSync("./data/modes.json"));

    var allowed = ["Regular", "Ranked", "League"];
    var arg = a.args[0]
    
    if (typeof a.args[0] === "undefined") {
      a.message.channel.send("Zu welchem Spielmodus? \n```-modes <Modus / list>```");
      a.message.channel.stopTyping();
      return;
    }

    if (arg == "list") {
      a.message.channel.send("```\n"+allowed.join("\n")+"```");
      a.message.channel.stopTyping()
      return;
    }

    if ( !allowed.map(x => x.toLowerCase()).includes(arg) ) {
      a.message.channel.send('\"'+ arg +'\" wurde nicht gefunden \n```-modes list```');
      a.message.channel.stopTyping();
      return;
    }

    if (a.args[1] == "next") {
      var next = true;
    } else {
      var next = false;
    }

    if (json.updatedAt == getTime()) {
      if (next) {
        draw(json.next);
      } else {
        draw(json.first);
      }
    } else {  
      client.getStages(function(res) {
        var modes = res;
        modes.updatedAt = getTime();
        fs.writeFileSync("./data/modes.json", JSON.stringify(modes, null, 2));
        if (next) {
          draw(modes.next);
        } else {
          draw(modes.first);
        }
      });
    }

    async function draw(modes) {
      const canvas = createCanvas(1200, 675);
      const ctx = canvas.getContext('2d');

      var mode = arg;
      var ranked = modes.ranked.mode;
      var league = modes.league.mode;

      var obj = {};


      switch (mode) {
        case "regular":
          obj.background = await loadImage("./data/assets/splatoon/TurfWarMaps.png");
          obj.submode = await loadImage("./data/assets/splatoon/TurfWar.png");
          break;
        case "ranked":
          obj.background = await loadImage("./data/assets/splatoon/RankedMaps.png");
          break;
        case "league":
          obj.background = await loadImage("./data/assets/splatoon/LeagueMaps.png");
          break;
      }
      
      var suburl;

      if (mode == "ranked") {
        switch (ranked) {
          case "Splat zones":
            suburl = "./data/assets/splatoon/SplatZones.png";
            break;
          case "Tower control":
            suburl = "./data/assets/splatoon/TowerControl.png";
            break;
          case "Rainmaker":
            suburl = "./data/assets/splatoon/Rainmaker.png";
            break;
          case "Clam Blitz":
            suburl = "./data/assets/splatoon/ClamBlitz.png";
            break;
        }
        obj.submode = await loadImage(suburl);
      }

      if (mode == "league") {
        switch (league) {
          case "Splat zones":
            suburl = "./data/assets/splatoon/SplatZones.png";
            break;
          case "Tower control":
            suburl = "./data/assets/splatoon/TowerControl.png";
            break;
          case "Rainmaker":
            suburl = "./data/assets/splatoon/Rainmaker.png";
            break;
          case "Clam Blitz":
            suburl = "./data/assets/splatoon/ClamBlitz.png";
            break;
        }
        obj.submode = await loadImage(suburl);
      }

      obj.stageA = await loadImage(modes[arg].stage_a.image);
      obj.stageB = await loadImage(modes[arg].stage_b.image);

      ctx.drawImage(obj.background, 0, 0, canvas.width, canvas.height);
      ctx.drawImage(obj.submode, 570, 570, 620, 100);
      ctx.drawImage(obj.stageA, 60, 125, 490, 225);
      ctx.drawImage(obj.stageB, 650, 270, 490, 225);
    
      var buffer = canvas.toBuffer('image/png');
      a.message.channel.send({files: [buffer]});

      a.message.channel.stopTyping()
    }

    function getTime() {
      var date = new Date();
      return [date.getFullYear(), date.getMonth(), date.getDate(), (date.getHours() - date.getHours() % 2)+2];
    }
	},

	info: {
		name: "modes",
		description: "Zeigt die aktuellen Spielmodi und Arenen in Splatoon 2 an",
		alias: undefined,
    usage: "<Modus / list> [next]",
    category: "splatoon"
	}
};

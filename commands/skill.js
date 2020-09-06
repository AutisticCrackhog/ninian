var seedrandom = require("seedrandom");

module.exports = {
	execute(a) {
    if (typeof a.message.mentions.users.first() !== "undefined") a.message.author = a.message.mentions.users.first();
    var seed = new Date().toLocaleString("en-US", {timeZone: "Europe/Amsterdam"}).split(",")[0] + a.message.author.id;
		var rng = seedrandom(seed);
    var skill = Math.floor(rng()*101) + 1;
    if (a.message.author.id == a.client.user.id) skill = 101;
		var meter = [];
		var textNo = 0;
		if (skill != 101) {
			for (var i = 1; i < 6; i++) {
				if ( i*16 < skill ) {
					meter.push(":blue_circle:");
					textNo++;
				}
			}
      while (meter.length < 5) {
				meter.push(":white_circle:");
			}
		} else {
			if (Math.floor(Math.random() * 2) == 1 || a.message.author.id == a.client.user.id) {
				textNo = 6;
				for (const a of new Array(5)) {
					meter.push(":red_circle:");
				}
			} else {
				skill = 100;
				textNo = 5;
				for (const a of new Array(5)) {
					meter.push(":blue_circle:");
				}
			}
		}
		var texts = [
			"Name: "+a.message.author.username+" \nSkill-Level: "+skill+"% - Dein Skill ist nicht vorhanden. \n",
			"Name: "+a.message.author.username+" \nSkill-Level: "+skill+"% - Sehr Verbesserungsfähig. \n",
			"Name: "+a.message.author.username+" \nSkill-Level: "+skill+"% - Ziemlich mittelmäßig. \n",
			"Name: "+a.message.author.username+" \nSkill-Level: "+skill+"% - Nicht schlecht! \n",
			"Name: "+a.message.author.username+" \nSkill-Level: "+skill+"% - Dein Skill-Level ist echt gut! \n",
			"Name: "+a.message.author.username+" \nSkill-Level: "+skill+"% - Außerordentlich guter Skill! \n",
			"Name: "+a.message.author.username+" \nSkill-Level: ???% - Dein Skill übertrifft den messbaren Bereich! Unglaublich! \n"
		];
    if (a.message.author.id == a.client.user.id) {
      a.message.channel.send("Name: "+a.message.author.username+" \nSkill-Level: ???% - Was hast du auch erwartet? \n"+meter.join(""));
      return;
    }
    if (skill == 69) {
      a.message.channel.send("Name: "+a.message.author.username+" \nSkill-Level: 69% - :fire::joy::ok_hand::100: \n"+meter.join(""));
      return;
    }
		a.message.channel.send(texts[textNo]+meter.join(""));
	},

	info: {
		name: "skill",
		description: "Berechnet deinen Skill-Level",
		alias: undefined,
    category: "daily"
	}
};

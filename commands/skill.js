module.exports = {
	execute(a) {
		var skill = Math.floor(Math.random()*101) + 1;
		var meter = [];
		var textNo = 0;
		if (skill != 101) {
			for (i = 1; i < 6; i++) {
				if ( i*16 < skill ) {
					meter.push(":blue_circle:");
					textNo++;
				}
			}
			while (meter.length < 5) {
				meter.push(":white_circle:");
			}
		} else {
			if (Math.floor(Math.random() * 2) == 1) {
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
		a.message.channel.send(texts[textNo]+meter.join(""));
	},

	info: {
		name: "skill",
		description: "Berechnet deinen Skill-Level",
		alias: undefined
	}
};

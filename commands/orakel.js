const Discord = require("discord.js");

module.exports = {
	execute(a) {
		if (a.args.length == 0) {
			a.message.channel.send("Keine Frage gestellt");
			return;
		}
    
    var random = Math.floor(Math.random()*50) +1;
    var random2 = Math.floor(Math.random()*9) +2;

		var normal = [
			"Absolut nicht.",
			"Nein.",
			"Ich denke nicht.",
			"Ausgeschlossen.",
			"Wahrscheinlich nicht.",
			"Wahrscheinlich.",
			"Ja.",
			"Klar!",
			"Ganz sicher.",
			"Bestimmt.",
			"Schwer zu sagen.",
			"Frag doch einfach nochmal.",
			"Ich weiß nicht.",
			"Die Antwort ist doch offensichtlich.",
			"Vielleicht weiß Lord Eliwood darüber Bescheid!",
			"大丈夫！(^・^) \nMoment, du bist ja kein Weeb."
		];
    
    var warum = [
      "Ich kenne den Grund dafür nicht.",
      "Weil es einfach richtig ist.",
      "Der Weg ist das Ziel",
      "Wo Licht scheint, fällt immer auch Schatten.",
      "Es gibt immer zwei Seiten einer Medaille.",
      "Die Macht der Freundschaft überwindet auch dieses Hindernis.",
      "Du musst nur fest an dich glauben, dann findest du eine Lösung.",
      "Nicht die Zeiger sind es, die eine Uhr zum Laufen bringen.",
      "Mit dieser Herangehensweise wirst du nicht weiter kommen.",
      "Weil viele Puzzelteilchen ein Gesamtbild ergeben.",
      "Training ist auch hier der Weg zum Erfolg.",
      "Wenn das Leben dir Zitronen gibt, mach Limonade daraus.",
      "Der Schuster sollte eben bei seinen Leisten bleiben.",
      "Nur weil man etwas nicht sehen kann bedeutet das nicht, dass es nicht existiert.",
      "Aus großer Macht folgt große Verantwortung."
    ];
    
    var wo = [
      "In deinem Herzen.",
      "Irgendwo im nirgendwo.",
      "51.473139, -3.196469",
      "In Elibe.",
      "Immer dort wo du als letztes suchst.",
      "Wer in die Ferne schaut übersieht die Lösung vor der eigenen Nase.",
      "Der Ort ist egal.",
      "Dort wo keine Blumen blühen.",
      "Dies wird eine lange Reise für dich werden.",
      "Greife nicht nach den Sternen, sie sind unerreichbar.",
      "An einem anderen Ort.",
      "Zuhause, denn da ist es am Schönsten.",
      "Gut versteckt.",
      "Dafür benötigt es einen besonderen Blick.",
      "Dort wo kein Licht scheint."
    ];
    
    var wann = [
      "Dann wenn du es am wenigsten erwartest.",
      "Geduld ist eine Tugend.",
      "Du bist noch nicht bereit dazu.",
      "Dieser Zeitpunkt ist immer anders.",
      "Du kannst dich schon heute darauf vorbereiten.",
      "Wenn du dich nicht beeilst, verpasst du es.",
      "Das kann noch lange dauern.",
      "Ehe du dich versiehst ist es so weit.",
      "Der Zug ist wahrscheinlich bereits abgefahren.",
      "In "+random+" Tagen stehen die Chancen gut dafür.",
      "In "+random+" Jahren stehen die Chancen gut dafür.",
      "So etwas braucht seine Zeit.",
      "Ich glaube nicht mehr daran..."
    ];
    
    var wieviel = [
      "Nicht mehr als "+random2+".",
      "Maximal "+random2+".",
      "Viel zu viele.",
      "Davon gibt es nie genug.",
      "Ich habe aufgehört zu zählen.",
      "Das kann man an einer Hand abzählen.",
      "Mehr als du glaubst.",
      "Hier gilt Qualität vor Quantität."
    ]
    
    var answer;
    // answer = normal[Math.floor(Math.random()*normal.length)];

    switch (a.args[0].toLowerCase()) {
      case "warum":
      case "wie":
      case "wieso":
        answer = warum[Math.floor(Math.random()*warum.length)];
        break;
        
      case "wo":
      case "woher":
        answer = wo[Math.floor(Math.random()*wo.length)];
        break;
        
      case "wann":
        answer = wann[Math.floor(Math.random()*wann.length)];
        break;
        
      case "wieviel":
      case "wieviele":
        answer = wieviel[Math.floor(Math.random()*wieviel.length)];
        break;
        
      default:
        answer = normal[Math.floor(Math.random()*normal.length)];
        break;
    }

		const embed = new Discord.MessageEmbed()
	  .setColor(0xA1FFFF)
	  .setThumbnail("https://imgur.com/r3Oq6Wu.png")
	  .setFooter("Frage von "+a.message.author.username, a.message.author.avatarURL())
	  .addField("Frage:", a.args.join(" "))
	  .addField("Antwort:", answer)
	 a.message.channel.send(embed);
	},

	info: {
		name: "orakel",
		description: "Sieht deine Zukunft vorraus und beantwortet dir jede Frage",
		usage: "<Frage>",
		alias: undefined,
    category: "divers"
	}
};

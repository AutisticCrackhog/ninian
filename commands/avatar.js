module.exports = {
	execute(a) { with(a) {
    let user;
    if (!message.mentions.users.first()) {
      user = message.author;
    } else {
      user = message.mentions.users.first();
    }

    message.channel.send(user.displayAvatarURL({size: 1024, format: "png"}))
    .catch(e => {
      message.channel.send("Kein Profilbild gefunden");
    })
	}},

	info: {
		name: "avatar",
		description: "Zeigt Profilbilder von Nutzern an",
		alias: undefined,
    usage: "[@Nutzer]",
    category: "divers"
	}
};

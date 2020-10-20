module.exports = {
	execute(a) {
    a.message.channel.send(a.client.guilds.cache.get("243714119545520129").members.cache.random().user.displayAvatarURL({format: "png", size: 1024}));
	},

	info: {
		name: "mystery",
		description: "Dieser Befehl verändert von Zeit zu Zeit seine Funktion",
		alias: undefined,
    usage: "",
    category: "divers"
	}
};

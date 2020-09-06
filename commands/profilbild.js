module.exports = {
	execute(a) {
		const artist = a.client.users.cache.get("338075478118236160");
		a.message.channel.send({
			embed: {
				"title": "Ninians Profilbild",
				"thumbnail": {
					"url": a.client.user.avatarURL()
				},
				"image": {
					"url": 'https://i.imgur.com/UAT0if3.png'
				},
				"footer": {
					"icon_url": artist.avatarURL(),
					"text": "Profilbild von @"+artist.username+"#4572"
				},
				"color": 10616831
			}
		});
	},

	info: {
		name: "profilbild",
		description: "Informationen zum coolen Profilbild von Ninian",
		alias: undefined,
    category: "ninian"
	}
};

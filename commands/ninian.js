module.exports = {
	execute(a) {
		// const ninian = a.client.emojis.get("695011975390036079");
    const ninian = "<:ninian:695011975390036079>";
		a.message.channel.send("Rawr! :dragon:"+ninian+":blue_heart:");
    if (a.client.connected && a.client.vc) {
      a.client.play("https://cdn.glitch.com/4f29c3dc-c285-4fd6-804a-641a956f47ac%2FVOICE_Ninian_Oracle_of_Destiny_ATTACK_1.wav?v=1587945241013");
    }
	},

	info: {
		name: "ninian",
		description: "Ninians wahre Form",
		alias: undefined
	}
};

module.exports = {
	execute(a) {
		// const ninian = a.client.emojis.get("695011975390036079");
    const ninian = "<:ninian:695011975390036079>";
		a.message.channel.send("Rawr! :dragon:"+ninian+":blue_heart:");
	},

	info: {
		name: "ninian",
		description: "Ninians wahre Form",
		alias: undefined,
    category: "ninian"
	}
};

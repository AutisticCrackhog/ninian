module.exports = {
	execute(a) {
    if (!a.args.length) {
      a.message.channel.send("Was soll ich sagen? \n`-say <Text>`");
      return;
    }
		const sayMessage = a.args.join(" ");
    a.message.channel.send(sayMessage);
	},

	info: {
		name: "say",
		description: "Lässt Ninian etwas sagen",
		alias: undefined,
    usage: "<Text>",
    category: "text"
	}
};

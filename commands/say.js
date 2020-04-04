module.exports = {
	execute(a) {
		const sayMessage = a.args.join(" ");
    a.message.channel.send(sayMessage);
	},

	info: {
		name: "say",
		description: "Lässt Ninian etwas sagen",
		alias: undefined
	}
};

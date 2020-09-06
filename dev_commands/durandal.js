module.exports = {
	execute(a) {
    a.message.react("✅").then(() => {
      process.exit(0);
    });
	},

	info: {
		name: "durandal",
		description: "",
		alias: undefined
	}
};

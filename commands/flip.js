module.exports = {
	execute(a) {
    const faces = ["<:NinianCoin:707020637419339797>", "<:NinianCoin2:707022461266427935>"];
    var num = Math.floor(Math.random()*2);
    var counter = 0;
    
    a.message.channel.send(faces[num])
    .then(msg => {
      setTimeout(flip, 800);
      function flip() {
        if (counter <= 4) {
          num == 0 ? num++ : num--;
          msg.edit(faces[num]);
          counter++
          setTimeout(flip, 800);
        }
      }
    });
    
	},

	info: {
		name: "flip",
		description: "Kopf oder Schwert",
		alias: undefined,
    category: "divers"
	}
};

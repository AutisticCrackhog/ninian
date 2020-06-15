const Discord = require("discord.js");

module.exports = {
	execute(a) {
    if (typeof a.message.mentions.users.first() !== "undefined") {
      a.message.author = a.message.mentions.users.first()
    }
    
    var data = {
      id: a.message.author.id,
      created: new Date(a.message.author.createdTimestamp),
      display: a.message.member.displayName,
      name: a.message.author.tag,
      joined: new Date(a.message.member.joinedTimestamp),
      image: a.message.author.avatarURL(),
      color: a.message.member.displayHexColor,
      roles: [],
      icon: a.message.guild.iconURL()
    };
    
    a.message.member.roles.cache.forEach((role, key) => {
      data.roles.push(role.name)
    });
    data.roles.pop()
    
    // if (data.icon === null) data.icon = "http://127.0.0.1";
    
    const embed = new Discord.MessageEmbed()
    .setThumbnail(data.image)
    .setColor(data.color)
    .addField("Name:", data.display+ " ("+data.name+")")
    .addField("Discord beigetreten am:", stamper(data.created))
    .addField("Server beigetreten am:", stamper(data.joined))
    .addField("Rollen:", data.roles)
    .setFooter("ID: "+data.id, data.icon)
    a.message.channel.send(embed);
    
    function stamper(date) {
      var datum = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`.split(".").map(n => n.length == 1 ? n = "0"+n : n = n).join(".");
      var uhrzeit = `${date.getHours()}:${date.getMinutes()}`.split(":").map(n => n.length == 1 ? n = "0"+n : n = n).join(":");
      return datum+" "+uhrzeit;
    }
	},

	info: {
		name: "info",
		description: "Zeigt Info eines Nutzers an",
		alias: undefined,
    usage: "[@Nutzer]"
	}
};

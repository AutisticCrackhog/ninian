const Discord = require("discord.js")

module.exports = (member, sound) => {
  var sounds = new Discord.Collection()
  .set("dance", "https://cdn.glitch.com/4f29c3dc-c285-4fd6-804a-641a956f47ac%2FVOICE_Ninian_Oracle_of_Destiny_STATUS_2.wav?v=1587945341408")
  .set("help", "https://cdn.glitch.com/4f29c3dc-c285-4fd6-804a-641a956f47ac%2FVOICE_Ninian_Oracle_of_Destiny_STATUS_3.wav?v=1587945569548")
  .set("ninian", "https://cdn.glitch.com/4f29c3dc-c285-4fd6-804a-641a956f47ac%2FVOICE_Ninian_Oracle_of_Destiny_ATTACK_1.wav?v=1587945241013")
  .set("profilbild", "https://cdn.glitch.com/4f29c3dc-c285-4fd6-804a-641a956f47ac%2FVOICE_Ninian_Oracle_of_Destiny_SKILL_1.wav?v=1587945482430")
  
  if (sounds.has(sound)) {
    if (member.voice.channel !== null) {
      if (member.voice.channel.members.has(member.client.user.id)) {
        member.voice.channel.join()
        .then(connection => {
          connection.play(sounds.get(sound));
        });
      }
    }
  }
}
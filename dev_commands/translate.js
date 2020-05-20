var rp = require("request-promise");

module.exports = {
	execute(a) {
    a.message.channel.startTyping();
    var msg = a.args.join(" ");
    var output = "";
    
    var lang1 = "de";
    
    var langA = ["jp", "ko", "ru", "tr", "fr", "zh", "de"];
    
    var url = "https://translate.googleapis.com/translate_a/single?client=gtx&";
    
    var delay = 500 + ( Math.floor(Math.random() * 400) - 100 )
    
    // Das ist der dümmste Code den ich je geschrieben habe. Eine For Schleife oder ähnliches hat wegen Variable Scope Problemen
    // die ich nicht verstehe nicht geklappt. Promises machen mir bis heute Kopfschmerzen und ich habe keine Lust mehr lol.
    // Außerdem wird dieser Code eh von der kostenlosen Google Translate API geblockt weil Spam undso, also ja... Egal.
    
    // Gescheitertes Experiment I guess
    
    rp(url+"sl="+lang1+"&tl="+langA[0]+"&dt=t&q="+msg)
    .then(async res => {
      delay = 500 + ( Math.floor(Math.random() * 400) -100 )
      await new Promise(resolve => setTimeout(resolve, delay));
      rp(url+"sl="+langA[0]+"&tl="+langA[1]+"&dt=t&q="+JSON.parse(res)[0][0][0])
      .then(async res2 => {
        delay = 500 + ( Math.floor(Math.random() * 400) -100 )
        await new Promise(resolve => setTimeout(resolve, delay));
        rp(url+"sl="+langA[1]+"&tl="+langA[2]+"&dt=t&q="+JSON.parse(res2)[0][0][0])
        .then(async res3 => {
          delay = 500 + ( Math.floor(Math.random() * 400) -100 )
          await new Promise(resolve => setTimeout(resolve, delay));
          rp(url+"sl="+langA[2]+"&tl="+langA[3]+"&dt=t&q="+JSON.parse(res3)[0][0][0])
          .then(async res4 => {
            delay = 500 + ( Math.floor(Math.random() * 400) -100 )
            await new Promise(resolve => setTimeout(resolve, delay));
            rp(url+"sl="+langA[3]+"&tl="+langA[4]+"&dt=t&q="+JSON.parse(res4)[0][0][0])
            .then(async res5 => {
              delay = 500 + ( Math.floor(Math.random() * 400) -100 )
              await new Promise(resolve => setTimeout(resolve, delay));
              rp(url+"sl="+langA[4]+"&tl="+langA[5]+"&dt=t&q="+JSON.parse(res5)[0][0][0])
              .then(async res6 => {
                delay = 500 + ( Math.floor(Math.random() * 400) -100 )
                await new Promise(resolve => setTimeout(resolve, delay));
                rp(url+"sl="+langA[5]+"&tl="+langA[6]+"&dt=t&q="+JSON.parse(res6)[0][0][0])
                .then(async res7 => {
                  a.message.channel.send(JSON.parse(res7)[0][0][0]);
                });
              });
            });
          });
        });
      });
    });
    
    a.message.channel.stopTyping();
	},

	info: {
		name: "translate",
		description: "Übersetzt deine Nachricht durch mehrere Sprachen und zurück",
		alias: undefined,
    usage: "<Text>"
	}
};

(async function main() {

var response = await fetch("/controldata?type=guilddata");
var obj = await response.json();

var serverdiv = document.getElementById("servers");
var channeldiv = document.getElementById("channels");

var selectedServer = "";

var selectedChannel;

for (const id in obj) {
  var guild = obj[id];
  var image = document.createElement("img");

  image.src = guild.icon;
  image.className = "serverIcon";
  image.onclick = function() {
    renderChannels(id);
  }
  serverdiv.appendChild(image);
}

function renderChannels(guildid) {
  while (channeldiv.firstChild) {
    channeldiv.removeChild(channeldiv.lastChild);
  }

  for (const id in obj[guildid].channels) {
    var channel = obj[guildid].channels[id];
    if (channel.type == "voice") continue;

    var text = document.createElement("p");

    if (channel.type == "text") {
      text.innerHTML = "#"+channel.name;
      text.className = "channelName";
      text.channelid = id;
      text.onclick = async function() {
        var response = await fetch("/controldata?type=msgdata&id="+this.channelid);
        var arr = await response.json();
        selectedChannel = this.channelid;
        
        renderMessages(arr);
      }
    } else {
      text.innerHTML = channel.name;
      text.className = "category";
    }
    channeldiv.appendChild(text)
  }
}

function renderMessages(msgArr) {
  var msgdiv = document.getElementById("messages");

  while (msgdiv.firstChild) {
    msgdiv.removeChild(msgdiv.lastChild);
  }

  for (const message of msgArr) {

    var text = document.createElement("p");
    text.className = "message";
    text.innerHTML = message.username+": "+ message.content;

    msgdiv.appendChild(text);
  }

  var input = document.createElement("input");
  input.id = "input";
  input.addEventListener("keydown", async function(e) {
    if (e.keyCode === 13) {
      var text = e.target.value;

      var ok = await fetch("/control?id="+selectedChannel+"&msg="+encodeURI(text));

      var response = await fetch("/controldata?type=msgdata&id="+selectedChannel);
      var arr = await response.json();
      
      renderMessages(arr);
    }
  });

  msgdiv.appendChild(input);
}

})();




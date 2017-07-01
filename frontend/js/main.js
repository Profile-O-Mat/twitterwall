// Datum richtig formatieren
function formatDate(d) {
  return d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes()
}

// Main function
$(function() {
  t = document.getElementById('timeline')

  // Web Socket
  var ws = new WebSocket("ws://192.168.2.164:8000");

  // Connection bestätigung
  ws.onopen = function(){
    console.log("Socket has been opened!");
  };

  // Nachrichten anzeigen
  ws.onmessage = function(message) {
    message = JSON.parse(message.data);
    console.log(message);
    var tweet = '<div class="tweet"><img src="' + message["profile_img"] + '" class="tweet-avatar"><div class="tweet-political-real ' + message["real_party"] + '">' + message["real_party"] + '</div><div class="tweet-political-bot ' + message["guessed_party"] + '">' + message["guessed_party"] + '</div><div class="tweet-content"><h1>' + message["name"] + '</h1><h2>@' + message["handle"] + '</h2><p>' + message["text"] + '</p><p class="timestamp">' + formatDate(new Date(message["date"])) + '</p></div><div class="progress"><div class="bar" style="width:75%;"></div></div></div>';
    $(tweet).prependTo($(".timeline")).hide().show("drop", 500);
  };
});

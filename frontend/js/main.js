function formatDate(d) {
  return d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes()
}

$(function() {
  t = document.getElementById('timeline')

  var ws = new WebSocket("ws://:8000");
  
  ws.onopen = function(){
    console.log("Socket has been opened!");
  };

  ws.onmessage = function(message) {
    message = JSON.parse(message.data);
    console.log(message);
    var tweet = '<div class="tweet"><img src="' + message["profile_img"] + '" class="tweet-avatar"><div class="tweet-political-real green">Grüne</div><div class="tweet-political-bot blue">AfD</div><div class="tweet-content"><h1>' + message["name"] + '</h1><h2>@' + message["handle"] + '</h2><p>' + message["text"] + '</p><p class="timestamp">' + formatDate(new Date(message["date"])) + '</p></div><div class="progress"><div class="bar" style="width:75%;"></div></div></div>';
    //$(".timeline").prepend($(tweet).show("fade", 500));
    $(tweet).prependTo($(".timeline")).hide().show("drop", 500);
  };
});

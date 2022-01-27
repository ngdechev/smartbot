const Discord = require("discord.js");
const request = require("request");
module.exports.run = async (bot, message, args) => {
    
    request("http://www.murfguy.com/puns.php", function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var pun = body;
        message.channel.send(`**${pun}**`);
      }
    });
}

module.exports.help = {
    name: "dadjoke"
}
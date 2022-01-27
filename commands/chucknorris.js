const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    
    var request = require("request");
    request("https://api.chucknorris.io/jokes/random", function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        message.channel.send("**Chuck Norris Fact:** " + info.value);
      }
    });
}

module.exports.help = {
    name: "chucknorris"
}
const Discord = require("discord.js");
const { meme } = require('memejs');

module.exports.run = async (bot, message, args) => {
  meme(function (err, data) {
    if (err) return console.error(err);
    console.log(data);

    let bicon = bot.user.displayAvatarURL();
    let catEmbed = new Discord.MessageEmbed()
      .setAuthor("Meme || " + bot.user.username, bicon)
      .setColor("RANDOM")
      // .addField("Just a random meme :smiley:")
      .addField("Title:", `${data.title}`, true)
      .addField("From: ", `${data.author}`, true)
      .setFooter(bot.user.username, bicon)
      .setImage(data.url)
      .setTimestamp()
    message.channel.send(catEmbed);

  });
}

module.exports.help = {
  name: "meme"
}
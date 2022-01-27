const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async(bot, message, args) => {
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
      
  if(args[0] == "help" || !args[0]){
      if(!prefixes[message.guild.id]) message.reply(`Usage: >quote [message id]`);
      else message.reply(`Usage: ${prefixes[message.guild.id].prefixes}quote [message id]`);
      return;
  }

  function quote(messageInfo) {
    var text = messageInfo.content
    var author = messageInfo.author
    var tag = author.tag
    var icon = author.displayAvatarURL()
    var time = new Date(messageInfo.createdTimestamp);
  
    let bicon = bot.user.displayAvatarURL();
    const quoteEmbed = new Discord.MessageEmbed()
      .setColor(0x9900FF)
      .setThumbnail(icon)
      .setTimestamp()
      .setAuthor("Quote || " + bot.user.username, bicon)
      .setDescription(`${time}\n\n${text}`)
      .setFooter(bot.user.username, bicon)
    return message.channel.send({
      embed: quoteEmbed
    });
  
  }
  
  if (args.length == 1) {
    try {
      message.channel.fetchMessage(args[0])
        .then(message => quote(message))
      // .catch(message.reply("there was an error finding that message. Please make sure you have the proper message ID."));
    } catch (error) {
      console.log(error)
      // return message.reply("there was an error finding that message. Please make sure you have the proper message ID.")
    }
  }
  
  if (args.length == 2) {
    try {
      client.channels.get(args[1]).fetchMessage(args[0])
        .then(message => quote(message))
      // .catch(message.reply("there was an error finding that message. Please make sure you have the proper message ID."));
  
    } catch (error) {
      console.log(error)
      return message.reply("There was an error finding that message. Please make sure you have the proper message ID.")
    }
  
  }
  
  if (args.length == 0) {
    return message.reply("You must supply a message ID (and a channel ID if the message is in another channel).")
  }
  
  if (args.length >= 3) {
    return message.reply("You must only supply a message ID (and a channel ID if the message is in another channel).")
  }
};

module.exports.help = {
  name: "quote"
}





const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL();
    const embed = new Discord.MessageEmbed()
    .setAuthor("Bot Info || " + bot.user.username, bicon)
    .setColor(0x00AE86)
    .addField("Bot Name", bot.user.username)
    .addField("Created On", bot.user.createdAt)
    .setFooter(bot.user.username, bicon)
    .setThumbnail(bicon)
    .setTimestamp()
    message.channel.send({embed});
}

module.exports.help = {
  name:"botinfo"
}

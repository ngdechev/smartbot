const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    let sicon = message.guild.iconURL;
    let bicon = bot.user.displayAvatarURL();
    const embed = new Discord.MessageEmbed()
    .setAuthor("Server Info || " + bot.user.username, bicon)
    .setColor(0x00AE86)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount)
    .setFooter(bot.user.username, bicon)
    .setThumbnail(sicon)
    .setTimestamp()
    message.channel.send({embed});
}

module.exports.help = {
    name: "serverinfo"
}


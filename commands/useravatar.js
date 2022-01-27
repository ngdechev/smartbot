const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let msg = await message.channel.send("Generating avatar...");
    msg.delete({ timeout: 1000, reason: 'Deleted.' });

    let mentionedUser = message.mentions.users.first() || message.author;

        let embed = new Discord.MessageEmbed()

        .setImage(mentionedUser.displayAvatarURL())
        .setColor("00ff00")
        .setTitle("Avatar")
        .setFooter("Searched by " + message.author.tag)
        .setDescription("[Avatar URL link]("+mentionedUser.displayAvatarURL()+")");

        message.channel.send(embed);
}

module.exports.help = {
    name: "useravatar"
}
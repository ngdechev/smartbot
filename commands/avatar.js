const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if(args[0] == "help" || !args[0]){
        if(!prefixes[message.guild.id]) message.reply(`Usage: >аvatar @member`);
        else message.reply(`Usage: ${prefixes[message.guild.id].prefixes}аvatar @member`);
        return;
    }
    let msg = await message.channel.send("Generating avatar...");
    delete({ timeout: 5000, reason: 'Deleted.' });

    let mentionedUser = message.mentions.users.first() || message.author;

    let bicon = bot.user.displayAvatarURL();
    let avatarEmbed = new Discord.MessageEmbed()
        .setAuthor("Avatar || " + bot.user.username, bot.user.displayAvatarURL())
        .setColor("RANDOM")
        .setTitle(message.author.username)
        .addField("Searched by", message.author.tag)
        .setFooter(bot.user.username, bicon)
        .setImage(mentionedUser.displayAvatarURL())
        .setTimestamp()
    message.reply(avatarEmbed);
}

module.exports.help = {
    name: "avatar"
}
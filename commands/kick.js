const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async(bot, message, args) => {
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
      
    if(args[0] == "help" || !args[0]){
        if(!prefixes[message.guild.id]) message.reply(`Usage: >kick @member <reason>`);
        else message.reply(`Usage: ${prefixes[message.guild.id].prefixes}kick @member <reason>`);
        return;
    }

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    //if(!kUser) return message.channel.send("Couldn't find user.");
    let kReason = args.join(" ").slice(22);
    if(!kUser || !kReason) return message.reply("Usage: >kick @member <reason>").then(msg => {delete({ timeout: 5000, reason: 'Deleted.' });(10000)});
    if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("You don't have permission to kick members!");
    if(kUser.permissions.has("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

    let bicon = bot.user.displayAvatarURL();
    let kickEmbed = new Discord.MessageEmbed()
    .setAuthor("Member Kick || " + bot.user.username, bicon)
    .setColor("#FF8300")
    .addField("Kicked User", `${kUser} with ID: ${kUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> with id ${message.author.id}`)
    .addField("Kicked In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", kReason)
    .setFooter(bot.user.username, bicon)
    .setThumbnail(kUser.user.displayAvatarURL())
    .setTimestamp()

    let kickChannel = message.guild.channels.cache.find(channel => channel.name.toLowerCase() === "kick-ban");
    if(!kickChannel) return message.channel.send("Couldn't find ban channel. Please use the *setup* command!")

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);
}

module.exports.help = {
    name: "kick"
}

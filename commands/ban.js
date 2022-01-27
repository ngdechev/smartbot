const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

      if(args[0] == "help" || !args[0]){
        if(!prefixes[message.guild.id]) message.reply(`Usage: >ban @member <reason>`);
        else message.reply(`Usage: ${prefixes[message.guild.id].prefixes}ban @member <reason>`);
        return;
      }
      
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    //if(!bUser) return message.channel.send("Couldn't find user.");
    let bReason = args.join(" ").slice(22);
    if(!bUser || !bReason) return message.reply("Usage: >ban @user <reason>").then(msg => {delete({ timeout: 5000, reason: 'Deleted.' });(10000)});
    if(!message.member.permissions.has("MANAGE_MEMBERS")) return message.channel.send("You don't have permission to ban members!");
    if(bUser.permissions.has("MANAGE_MESSAGES")) return message.channel.send("That person can't be banned!");

    let bicon = bot.user.displayAvatarURL();
    let banEmbed = new Discord.MessageEmbed()
    .setAuthor("Member Ban || " + bot.user.username, bicon)
    .setColor("#e60c00")
    .addField("Banned User", `${bUser} with ID: ${bUser.id}`)
    .addField("Banned By", `<@${message.author.id}> with id ${message.author.id}`)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason)
    .setFooter(bot.user.username, bicon)
    .setThumbnail(bUser.user.displayAvatarURL())
    .setTimestamp()

    let banChannel = message.guild.channels.cache.find(channel => channel.name.toLowerCase() === "kick-ban");
    if(!banChannel) return message.channel.send("Couldn't find ban channel. Please use the *setup* command!");

    //message.guild.member(bUser).ban(bReason);
    message.guild.members.ban(bUser.id);
    banChannel.send(banEmbed);
}

module.exports.help = {
    name: "ban"
}

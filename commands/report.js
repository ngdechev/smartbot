const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async(bot, message, args) => {
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
      
    if(args[0] == "help" || !args[0]){
        if(!prefixes[message.guild.id]) message.reply(`Usage: >report @member <reason>`);
        else message.reply(`Usage: ${prefixes[message.guild.id].prefixes}report @member <reason>`);
        return;
    }

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if(!rUser) return message.channel.send("Couldn't find user.");
    let reason = args.join(" ").slice(22);
    if(!reason) return message.channel.send("Please provide a reason for reporting!");
    if(rUser.permissions.has(0x00000008)) return message.reply("Can't report them!");

    let bicon = bot.user.displayAvatarURL();
    let reportEmbed = new Discord.MessageEmbed()
    .setAuthor("Member Report || " + bot.user.username, bicon)
    .setDescription("Reports")
    .setColor("#FBFF00")
    .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported user", `${rUser} with ID: ${rUser.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", reason)
    .setFooter(bot.user.username, bicon)
    .setThumbnail(rUser.user.displayAvatarURL())
    .setTimestamp()

    let reportsChannel = message.guild.channels.cache.find(channel => channel.name.toLowerCase() === "reports");
    if(!reportsChannel) return message.channel.send("Couldn't find ban channel. Please use the *setup* command!")

    reportsChannel.send(reportEmbed);
}

module.exports.help = {
    name: "report"
}

const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

    if (!message.member.permissions.has(0x00000008)) return message.reply("You don't have permissions to do that!");
    if (args[0] == "help") {
        if(!prefixes[message.guild.id]) message.reply(`Usage: >prefix <new prefix> or >prefix => Shows the current prefix`);
        else message.reply(`Usage: ${prefixes[message.guild.id].prefixes}prefix <new prefix> or ${prefixes[message.guild.id].prefixes}prefix => Shows the current prefix`);
        return;
    }

    if(!args[0] && !prefixes[message.guild.id]) message.channel.send(`The prefix here is **">"**.`);
    if(!args[0]) message.channel.send(`The prefix here is **"${prefixes[message.guild.id].prefixes}"**.`);
    else {
        prefixes[message.guild.id] = {
            prefixes: args[0]
        };
    
        fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
            if(err) console.log(err)
        });
    
        let bicon = bot.user.displayAvatarURL();
        let prefixEmbed = new Discord.MessageEmbed()
        .setAuthor("New prefix || " + bot.user.username, bicon)
        .setColor("#01634c")
        .setTitle(`New prefix is "**${args[0]}**".`)
        .setFooter(bot.user.username, bicon)
        .setThumbnail(message.guild.iconURL)
        .setTimestamp()
    
        message.channel.send(prefixEmbed);
    }
}

module.exports.help = {
    name: "prefix"
}
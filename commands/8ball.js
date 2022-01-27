const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    
    if(args[0] == "help" || !args[0]){
        if(!prefixes[message.guild.id]) message.reply(`Usage: >8ball <question>`);
        else message.reply(`Usage: ${prefixes[message.guild.id].prefixes}8ball <question>`);
        return;
      }
    if(!args[2]) return message.reply("Please ask a full question!");
    let replies = ["Yes.", "No.", "I don't know.", "Ask again later."];

    let answer = Math.floor(Math.random() * replies.length);
    let question = args.slice(0).join(" ");

    let bicon = bot.user.displayAvatarURL();
    let eightBallEmbed = new Discord.MessageEmbed()
    .setAuthor("8ball || " + bot.user.username, bicon)
    .setColor("RANDOM")
    .addField("Question: ", question)
    .addField("From: ", message.author.username)
    .addField("Answer: ", replies[answer])
    .setFooter(bot.user.username, bicon)
    .setThumbnail(message.author.displayAvatarURL())
    .setTimestamp()

    return message.channel.send(eightBallEmbed);
}

module.exports.help = {
    name: "8ball"
}
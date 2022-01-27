const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    
    let bicon = bot.user.displayAvatarURL();
    let helpEmbed = new Discord.MessageEmbed()
        .setAuthor("List of commands || " + bot.user.username, bicon)
        .setColor("#1403ff")
        .addField("**1.Administration**", "addrole, removerole, kick, ban, report, tempmute, warn, prefix")
        .addField("**2.Fun**", "meme, dadjoke, coins, level, pay, 8ball, cat, dog, slots, chucknorris")
        .addField("**3.Music Commands**", "play, stop, pause, resume, skip, queue, np, volume, lyrics, nplyrics")
        .addField("**4.Info**", "botinfo, botstats, serverinfo, serverstats, invite")
        .addField("**5.Utilities**", "weather, calc, quote, steamstore, fortnite, avatar, poll, clear, setup")
        .addField("*If you don't know how to use a command, just type **>cmdusage**! or >command help*", "*Default prefix is **>**.* ")
        .setFooter(bot.user.username, bicon)
        .setThumbnail(bicon)
        .setTimestamp()
    message.reply("Check your DM!")
    message.author.send(helpEmbed)
}

module.exports.help = {
    name: "help"
}
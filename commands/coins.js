const Discord = require("discord.js");
let coins = require("../coins.json");

module.exports.run = async(bot, message, args) => {
    if(!coins[message.author.id]){
        coins[message.author.id] = {
            coins: 0
        };
    }
    //let bicon = bot.user.displayAvatarURL();
    let uCoins = coins[message.author.id].coins;
    let bicon = bot.user.displayAvatarURL();
    let coinEmbed = new Discord.MessageEmbed()
    .setAuthor("Coins || " + bot.user.username, bicon)
    .setColor("#8c7aff")
    .setTitle(message.author.username)
    .addField("💵", uCoins)
    .setFooter(bot.user.username, bicon)
    .setTimestamp()

    message.channel.send(coinEmbed).then(msg => {delete({ timeout: 5000, reason: 'Deleted.' });(10000)});
}

module.exports.help = {
    name: "coins"
}
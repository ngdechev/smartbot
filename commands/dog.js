const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
    
    let {body} = await superagent
    .get(`https://dog.ceo/api/breeds/image/random`)
    let bicon = bot.user.displayAvatarURL();
    let catEmbed = new Discord.MessageEmbed()
        .setAuthor("Dog || " + bot.user.username, bicon)
        .setColor("RANDOM")
        .addField("Just a random dog", ":dog:")
        .setFooter(bot.user.username, bicon)
        .setImage(body.message)
        .setTimestamp()
    message.channel.send(catEmbed);
}

module.exports.help = {
    name: "dog"
}
const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
    let {body} = await superagent
    .get(`http://aws.random.cat/meow`)
    let bicon = bot.user.displayAvatarURL();
    let catEmbed = new Discord.MessageEmbed()
        .setAuthor("Cat || " + bot.user.username, bicon)
        .setColor("RANDOM")
        .addField("Just a random cat", ":cat:")
        .setFooter(bot.user.username, bicon)
        .setImage(body.file)
        .setTimestamp()
    message.channel.send(catEmbed);
}

module.exports.help = {
    name: "cat"
}
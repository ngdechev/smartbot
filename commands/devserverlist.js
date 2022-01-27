const Discord = require("discord.js");
const request = require("request");

module.exports.run = async (bot, message, args) => {
    if(message.author.id == "210360825402228736") {
        message.channel.send(`${bot.user.username} is online on ${bot.guilds.size} servers!`);

        for (let i = 0; i < bot.guilds.size; i++) {
            bot.guilds.forEach((guilds) => {
                message.channel.send(`[${++i}] **${bot.user.username}** is online on **${guilds.name}** server with **${guilds.memberCount}** members!`);
            });
        }
    } //else return message.channel.send("You can't use this command!");  
}

module.exports.help = {
    name: "devserverlist"
}
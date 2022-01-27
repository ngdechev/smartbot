const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    let user = message.mentions.users.first();
    user.send('Банана Джо не трябва да умира!');
}

module.exports.help = {
    name: "dm"
}

const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
        //if (!message.guild.member(bot.user).permissions.has("SEND_MESSAGES")) return message.author.send('I don\'t have permission to Send Messages. Please enable send messages for my role!');
        let slots = ["🍎", "🍌", "🍒", "🍓", "🍈"];
        let result1 = Math.floor((Math.random() * slots.length));
        let result2 = Math.floor((Math.random() * slots.length));
        let result3 = Math.floor((Math.random() * slots.length));
        //let name = message.author.displayName;
        let aicon = message.author.displayAvatarURL();
        let bicon = bot.user.displayAvatarURL();
        if (slots[result1] === slots[result2] && slots[result3]) {
            let wEmbed = new Discord.MessageEmbed()
                .setAuthor("Slot Machine || " + bot.user.username, bot.user.displayAvatarURL())
                .addField("You Won!", "Good job!")
                .setFooter(bot.user.username, bicon)
                .setTitle(':slot_machine: Slots :slot_machine:')
                .addField('Result:', slots[result1] + slots[result2] + slots[result3], true)
                .setColor("#f4e842")
                .setTimestamp()
            message.channel.send(wEmbed);
        } else {
            let lEmbed = new Discord.MessageEmbed()
                .setAuthor("Slot Machine || " + bot.user.username, bot.user.displayAvatarURL())
                .addField("You Lost!", "Good luck next time!")
                .setFooter(bot.user.username, bicon)
                .setTitle(':slot_machine: Slots :slot_machine:')
                .addField('Result', slots[result1] + slots[result2] + slots[result3], true)
                .setColor("#f4e842")
                .setTimestamp()
            message.channel.send(lEmbed);
        }

    }

module.exports.help = {
    name: "slots"
}
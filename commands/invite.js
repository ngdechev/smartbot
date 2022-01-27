const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL();
    let inviteEmbed = new Discord.MessageEmbed()
        .setAuthor("Invite || " + bot.user.username, bicon)
        .setColor("RANDOM")
        .setTitle("Want to invite me to your guild? Click **here**!")
        .setURL("https://discord.com/oauth2/authorize?client_id=514371341563068430&scope=bot&permissions=305212502")
        .setFooter(bot.user.username, bicon)
        .setTimestamp()
        .setThumbnail(bicon);
    message.reply(inviteEmbed);
}

module.exports.help = {
    name: "invite"
}
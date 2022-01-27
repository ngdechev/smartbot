const Discord = require('discord.js');
const fs = require("fs");

exports.run = async (bot, message, args, ops) => {
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
      
    if(args[0] == "help" || !args[0]){
        if(!prefixes[message.guild.id]) message.reply(`Usage: >poll <question>`);
        else message.reply(`Usage: ${prefixes[message.guild.id].prefixes}poll <question>`);
        return;
    }

	if (!message.guild.roles.cache.find(role => role.name === "@everyone")) { //Whatever role you want, I pick @everyone because everyone can use this command
		message.channel.send('Invalid permissions.');
		return;
	}

    // Create Embed
    let bicon = bot.user.displayAvatarURL();
    const embed = new Discord.MessageEmbed()
        .setAuthor("Avatar || " + bot.user.username, bot.user.displayAvatarURL())
        .setColor("#f4f4f4") //To change color do .setcolor("#fffff")
        .setDescription(args.join(' '))
        .setTitle(`Poll Created By ${message.author.username}`)
        .addField('React to Vote.', ":white_check_mark: for yes and :negative_squared_cross_mark: for no.")
        .setFooter(bot.user.username, bicon)
        .setTimestamp()

    let msg = await message.channel.send(embed)
        .then(function (msg) {
            msg.react("❎");
            msg.react("✅"); // You can only add two reacts
            message.delete({timeout: 1000});
            }).catch(function(error) {
            console.log(error);
        });
};

module.exports.help = {
    name: "poll"
}
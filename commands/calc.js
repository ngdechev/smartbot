const Discord = require('discord.js'), math = require('math-expression-evaluator');
const fs = require("fs");
exports.run = (bot, message, args, tools) => {
      let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
      
      if(args[0] == "help" || !args[0]){
          if(!prefixes[message.guild.id]) message.reply(`Usage: >calc <value1 operator value2> => Example >calc 1 + 1, >calc (12 / 2) + 3`);
          else message.reply(`Usage: ${prefixes[message.guild.id].prefixes}calc <value1 operator value2> => Examples ${prefixes[message.guild.id].prefixes}calc 1 + 1, ${prefixes[message.guild.id].prefixes}calc (12 / 2) + 3`);
          return;
      }
    // Form Embed
    let bicon = bot.user.displayAvatarURL();
    const embed = new Discord.MessageEmbed()
    .setAuthor("Calculator || " + bot.user.username, bicon)
    .setColor('#c6ffd5')
    .setFooter(bot.user.username, bicon)
    .setTimestamp()
    // Evaluate Expression
    let result;
    try {
        
        result = math.eval(args.join(' '));
        
    } catch (e) { // This will catch any errors in the expression
        
        result = 'Error: "Invalid Input"';
        
    }
    // Configure Embed
    embed.addField('Input', `\`\`\`js\n${args.join(' ')}\`\`\``)
         .addField('Output', `\`\`\`js\n${result}\`\`\``);
         
    // Send Embed
    message.channel.send(embed);
}
module.exports.help = {
    name: "calc"
  }
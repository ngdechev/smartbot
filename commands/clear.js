const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
      
  if(args[0] == "help" || !args[0]){
      if(!prefixes[message.guild.id]) message.reply(`Usage: >clear <number of messages>`);
      else message.reply(`Usage: ${prefixes[message.guild.id].prefixes}clear <number of messages>`);
      return;
  }

  if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply("You don't have a permission to do that!");
  if(!args[0]) return message.channel.send("Specify a number of messages to delete!");
  message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`Cleared ${args[0]} messages.`).then(msg => msg.delete({ timeout: 5000, reason: 'Deleted.' }));
  });
}

module.exports.help = {
  name: "clear"
}
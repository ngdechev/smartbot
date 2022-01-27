const Discord = require("discord.js");
const botconfig = require("../botconfig");
let purple = botconfig.purple;
let xp = require("../xp.json");

module.exports.run = async (bot, message, args) => {
  if(!xp[message.author.id]){
   xp[message.author.id] = {
     xp: 0,
     level: 1
  };
}
  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvlXp = curlvl * 300;
  let difference = nxtLvlXp - curxp;

  let bicon = bot.user.displayAvatarURL();
  let lvlEmbed = new Discord.MessageEmbed()
  .setAuthor("Level || " + bot.user.username, bicon)
  .setTitle(message.author.username)
  .setThumbnail(message.author.displayAvatarURL())
  .setColor("#03fffb")
  .addField("Level", curlvl, true)
  .addField("XP", curxp, true)
  .setFooter(bot.user.username, bicon)
  .setTimestamp();

  message.channel.send(lvlEmbed).then(msg => {delete({ timeout: 5000, reason: 'Deleted.' });(5000)});
}

module.exports.help = {
  name: "level"
}

const Discord = require('discord.js')
var steam = require('steam-provider')
var provider = new steam.SteamProvider();
const fs = require("fs");

exports.run = (bot, message, args) => {
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
      
  if(args[0] == "help" || !args[0]){
      if(!prefixes[message.guild.id]) message.reply(`Usage: >steamstore [game name]`);
      else message.reply(`Usage: ${prefixes[message.guild.id].prefixes}steamstore [game name]`);
      return;
  }
      let game = args[0]
      let steampng = "https://cdn.discordapp.com/attachments/458004691402489856/470344660364034049/steam.png";
      let bicon = bot.user.displayAvatarURL();

      //if (!game) return message.reply('Usage: >steamstore <game>')
      provider.search(game).then(result => {
      provider.detail(result[0].id, "europe", "eu").then(results => {
        console.log(results)
        const embed = new Discord.MessageEmbed()
        .setAuthor("Steam Store || " + bot.user.username, bicon)
        .setColor("#36393F")
        .setTitle(result[0].name)
        .addField(`Game ID`, result[0].id, true)
        .setThumbnail(results.otherData.imageUrl)
        .addField('Genre', results.genres)
        .addField('Price', `Normal price **${results.priceData.initialPrice} €**
        Discounted price **${results.priceData.finalPrice} €**`, true)
        .addField('Platforms', results.otherData.platforms)
        .addField('Rating', results.otherData.metacriticScore)
        .addField('Labels', results.otherData.features)
        .addField('Developers', results.otherData.developer)
        .addField('Publishers', results.otherData.publisher)
        .setColor("#36393F")
        .setFooter(bot.user.username, bicon)
        message.channel.send(embed).catch(e => {
            //console.log(e)
            //message.reply('There was an error `' + game + '` No Game Found')
      })
    })
  })
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'steamstore',
  description: 'steamstore',
  usage: 'steamstore'
};
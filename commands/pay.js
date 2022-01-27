const Discord = require("discord.js");
const fs = require("fs");
let coins = require("../coins.json");

module.exports.run = async (bot, message, args) => {
  //!pay @isatisfied 59345
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
      
  if(args[0] == "help" || !args[0]){
      if(!prefixes[message.guild.id]) message.reply(`Usage: >pay @member <number of coins>`);
      else message.reply(`Usage: ${prefixes[message.guild.id].prefixes}pay @member <number of coins>`);
      return;
  }

  if(!coins[message.author.id]){
    return message.reply("You don't have any coins!")
  }

  let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);

  if(!coins[pUser.id]){
    coins[pUser.id] = {
      coins: 0
    };
  }

  let pCoins = coins[pUser.id].coins;
  let sCoins = coins[message.author.id].coins;

  if(sCoins < args[0]) return message.reply("Not enough coins there!");

  coins[message.author.id] = {
    coins: sCoins - parseInt(args[1])
  };

  coins[pUser.id] = {
    coins: pCoins + parseInt(args[1])
  };

  if(!args[1]) {
    message.channel.send(`Please enter how much coins you want to give.`);
  } else {
    if(message.author.id === pUser.id) {
      return message.channel.send("You can't give yourself coins!");
    } else {
      message.channel.send(`${message.author} has given ${pUser} ${args[1]} coins.`);
    }
  }

  fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
    if(err) cosole.log(err)
  });


}

module.exports.help = {
  name: "pay"
}

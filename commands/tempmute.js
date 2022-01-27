const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
  //!tempmute @user 1s/m/h/d
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
      
  if(args[0] == "help" || !args[0]){
      if(!prefixes[message.guild.id]) message.reply(`Usage: >tempmute @member <1s/m/h/d>`);
      else message.reply(`Usage: ${prefixes[message.guild.id].prefixes}tempmute @member <1s/m/h/d>`);
      return;
  }
  
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  if(!tomute) return message.reply("Couldn't find user.");
  if(tomute.permissions.has("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
  let muterole = message.guild.roles.cache.find(role => role.name === "muted");

  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.roles.create({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("You didn't specify a time!");

  await(tomute.roles.add(muterole.id));
  message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

  setTimeout(function(){
    tomute.roles.remove(muterole.id);
    message.channel.send(`<@${tomute.id}> has been unmuted!`);
  }, ms(mutetime));


//end of module
}

module.exports.help = {
  name: "tempmute"
}
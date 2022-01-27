const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");

let warns = JSON.parse(fs.readFileSync("./commands/warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {
  //!warn @testmember <reason>
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
      
  if(args[0] == "help" || !args[0]){
      if(!prefixes[message.guild.id]) message.reply(`Usage: >warn @member <reason>`);
      else message.reply(`Usage: ${prefixes[message.guild.id].prefixes}warn @member <reason>`);
      return;
  }

  if(!message.member.permissions.has("MANAGE_MEMBERS")) return message.reply("You don't have permissions to warn people!");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
  if(!wUser) return message.reply("Couldn't find them!");
  if(wUser.permissions.has("MANAGE_MESSAGES")) return message.reply("Can't warn them!");
  let reason = args.join(" ").slice(22);
  if(!reason) return message.reply("Please give a reason for warning!");
  //let banChannel = message.guild.channels.cache.find(`name`, "kick-ban"); 
  let banChannel = message.guild.channels.cache.find(channel => channel.name.toLowerCase() === "kick-ban");
  let bicon = bot.user.displayAvatarURL();

  if(!warns[wUser.id]) {
    warns[wUser.id] = {
      warns: 0
    };
  };

  warns[wUser.id].warns = warns[wUser.id].warns + 1;

  fs.writeFile("./commands/warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });

  let warnLevel = warns[wUser.id].warns;

  let warnEmbed = new Discord.MessageEmbed()
  .setAuthor("Warns || " + bot.user.username, bicon)
  .setColor("#fc6400")
  .addField("Warned User", `<@${wUser.id}>`)
  .addField("Warned In", message.channel)
  .addField("Number of Warnings", warns[wUser.id].warns)
  .addField("Reason", reason)
  .setFooter(bot.user.username, bicon)
  .setThumbnail(wUser.user.displayAvatarURL())
  .setTimestamp()

  let warnchannel = message.guild.channels.cache.find(channel => channel.name.toLowerCase() === "warnings");
  if(!warnchannel) return message.reply("Couldn't find channel.");

  warnchannel.send(warnEmbed);

  message.channel.send(`<@${wUser.id}> has been warned and he has ${warnLevel} warnings! Check the **warnings** channel for more information.`);

  if(warns[wUser.id].warns == 2) message.channel.send(`<@${wUser.id}>, **WARNING**: You have 2 warnings - if you get one more you will get ban!`);

  if(warns[wUser.id].warns == 3){
    // message.guild.member(wUser).ban("The member has more than 3 warnings, so he has been banned from the server!");
    wUser.ban({
      days: 2,
      reason: "The member has more than 3 warnings, so he has been banned from the server!"
    })
    message.channel.send(`Member <@${wUser.id}> has 3 warnings, so he has been banned from the server!`);

    let banEmbed = new Discord.MessageEmbed()
    .setAuthor("Member Ban || " + bot.user.username, bicon)
    .setColor("RED")
    .addField("Banned User", `${wUser} with ID: ${wUser.id}`)
    .addField("Banned By", `<@${message.author.id}> with id ${message.author.id}`)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", "The member has 3 warnings, so he has been banned from the server!")
    .setFooter(bot.user.username, bicon)
    .setThumbnail(wUser.user.displayAvatarURL())
    .setTimestamp()

    setTimeout(() => {
      if(!banChannel) return message.channel.send("Couldn't find ban channel!");
      else banChannel.send(banEmbed);
    }, 1000);

    warns[wUser.id].warns = warns[wUser.id].warns - 3;

    fs.writeFile("./commands/warnings.json", JSON.stringify(warns), (err) => {
      if (err) console.log(err)
    });

  }
}

module.exports.help = {
  name: "warn"
}

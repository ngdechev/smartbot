const Discord = require("discord.js")
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if(args[0] == "help" || !args[0]){
        if(!prefixes[message.guild.id]) message.reply(`Usage: >addrole @member [role]`);
        else message.reply(`Usage: ${prefixes[message.guild.id].prefixes}addrole @member [role]`);
        return;
      }
    if(!message.member.permissions.has(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.reply("You dont have permission to perform this command!")

    let rMember = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.cache.get(args[0]);
    if(!rMember) return message.reply("Please provide a user to add a role too.");
    //let role = message.guild.roles.find(r => r.name == args[1]) || message.guild.roles.find(r => r.id == args[1]) || message.mentions.roles.first();
    let role = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first();
    if(!role) return message.reply("Please provide a role to add to said user.") 

    if(!message.guild.me.permissions.has(["MANAGE_ROLES"])) return message.reply("I don't have the **MANAGE_ROLES** permission to perform this command.")

    if(rMember.roles.cache.has(role.id)) {
        return message.reply(`${rMember.displayName}, already has the role!`)
    } else {
        await rMember.roles.add(role.id).catch(e => console.log(e.message))
        message.reply(`The role, ${role.name}, has been added to ${rMember.displayName}.`)
        //rMember.send(`:ok_hand: Congrats, you have been given the role **${role.name}** in **${rMember.guild.name}**!`);
    }

    let bicon = bot.user.displayAvatarURL();
    let memberavatar = rMember.user.displayAvatarURL();
    let addRoleEmbed = new Discord.MessageEmbed()
    .setAuthor("Add Role || " + bot.user.username, bicon)
    .setColor("RANDOM")
    .setThumbnail(memberavatar)
    .addField(":bust_in_silhouette: | Name: ", `${rMember.user.username}`)
    .addField(":id: | User: ", "**[" + `${rMember.id}` + "]**")
    .addField(":gear: | Role", `${role.name}`, true)
    .addField(":city_sunset: | Server", `${rMember.guild.name}`, true)
    .setFooter(`${bot.user.username}`, bicon)
    .setTimestamp()

    message.channel.send(addRoleEmbed);
}

module.exports.help = {
    name: "addrole",
}
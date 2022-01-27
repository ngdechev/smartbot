const Discord = require('discord.js');

module.exports.run = async (bot, message, args, guild) => {
    let server = message.guild;
    let channelCreated;
    let bicon = bot.user.displayAvatarURL();
    let allMembers = message.guild.memberCount;
    let memberHuman = message.guild.members.filter(member => !member.user.bot).size;
    let memberBot = message.guild.members.filter(member => member.user.bot).size;

    let memberCounterEmbed = new Discord.MessageEmbed()
    .setAuthor("Member Counter Voice Channels Creation || " + bot.user.username, bicon)
    .setColor("RANDOM")
    .addField(`These Voice Channels Will Be Created: **Members**, **Humans**, **Bots**`, "If you agree with that react with 👍 and the bot will create them for you!")
    .setFooter(bot.user.username, bicon)
    .setThumbnail(bicon)
    .setTimestamp()

    message.channel.send(memberCounterEmbed);

    bot.on('messageReactionAdd', async (reaction, user) => {
        if (reaction.emoji.name === "👍") {
            if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply("You don't have permission to use this command!");
            else {
                if(!server.channels.find(c => c.name == "Member Counter" && c.type == "category")) {
                    server.channels.create("Member Counter", { type: 'category' }).then(cat => {
                      cat.setPosition(0);
                    });
                  } else message.reply("Category already exists.");
            
                  setTimeout(() => {
                    let category = server.channels.find(c => c.name == "Member Counter" && c.type == "category");

                    server.channels.create(`Members: ${allMembers}`, {
                    type: 'voice',
                    permissionOverwrites: [
                        {
                            id: server.id,
                            deny: ['CONNECT']
                        }
                    ]
                    })
                    .then(channel => {
                      if (!channel) throw new Error("Category channel does not exist");
                      channel.setParent(category.id);
                      channelCreated = true;
                    }).catch(console.error);
                
                    server.channels.create(`Humans: ${memberHuman}`, { 
                        type: 'voice',
                        permissionOverwrites: [
                            {
                                id: server.id,
                                deny: ['CONNECT']
                            }
                        ]
                        })
                        .then(channel => {
                            if (!channel) throw new Error("Category channel does not exist");
                            channel.setParent(category.id);
                            channelCreated = true;
                          }).catch(console.error);
                      
                          server.channels.create(`Bots: ${memberBot}`, {
                              type: 'voice',
                              permissionOverwrites: [
                                  {
                                      id: server.id,
                                      deny: ['CONNECT']
                                  }
                              ]
                          })
                          .then(channel => {
                            if (!channel) throw new Error("Category channel does not exist");
                            channel.setParent(category.id);
                            channelCreated = true;
                          }).catch(console.error);                        
                    }, 500)

                if(channelCreated) {
                    let bicon = bot.user.displayAvatarURL();
                    let memberCounterChannelsEmbed = new Discord.MessageEmbed()
                    .setAuthor("Created Member Counter Voice Channels || " + bot.user.username, bicon)
                    .setColor("#bedfff")
                    .addField(`Voice Channels Created: **Members**, **Humans**, **Bots**`)
                    .setFooter(bot.user.username, bicon)
                    .setThumbnail(bicon)
                    .setTimestamp()
                
                    message.channel.send(memberCounterChannelsEmbed);
                };
            }
        }
    });

    bot.on("guildMemberAdd", member => {
        if(message.guild.members.filter(member => member.user.bot).size) memberBot++;
        else {
            allMembers++;
            memberHuman++;
        }
    });

    bot.on("guildMemberRemove", member => {
        if(message.guild.members.filter(member => member.user.bot).size) memberBot--;
        else {
            allMembers--;
            memberHuman--;
        }
    });
}

module.exports.help = {
    name: "membercounter"
}
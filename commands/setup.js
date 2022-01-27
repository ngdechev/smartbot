const Discord = require('discord.js');

module.exports.run = async (bot, message, args, guild) => {
    let bicon = bot.user.displayAvatarURL();
    let setupEmbed = new Discord.MessageEmbed()
    .setAuthor("Setup || " + bot.user.username, bicon)
    .setColor("#bedfff")
    .addField("Thank you for adding me! :white_check_mark: \n- My prefix is ``>``\n- You can see a list of commands by typing >help\n- To setup the bot you will need to follow these steps:", "\n 1. Create a ``warnings`` channel named ``warnings``.\n 2. Create a ``kick and ban`` channel named ``kick-ban``.\n 3. Create a ``reports`` channel named ``reports``.\n 4. Create a ``member log`` channel named ``member-log``\n5. Create a ``members`` role so the bot will automatically set the role of new members to ``members``\n6. Create a ``muted`` in order to use ``tempmute`` command\n**If you want to run auto setup just react to this message with :thumbsup:.**")
    .setFooter(bot.user.username, bicon)
    .setThumbnail(bicon)
    .setTimestamp()

    message.channel.send(setupEmbed)

    // let msg = message.channel.send(setupEmbed)
    // .then(function (msg) {
    //     msg.react(":thumbsup:"); // You can only add two reacts
    //     message.delete({timeout: 1000});
    //     }).catch(function(error) {
    //     console.log(error);
    // });

    bot.on('messageReactionAdd', async (reaction, user) => {
        if (reaction.emoji.name === "👍") {
          try {
            let server = message.guild;
            let warningsChannel = "warnings";
            let kickBanChannel = "kick-ban";
            let reportsChannel = "reports";
            let memberLogChannel = "member-log";
            let roleName = "members";
            let muterole = message.guild.roles.find(`name`, "muted");
        
            server.channels.create(`${bot.user.username}'s category`, { type: 'category' }).then(cat => {
              cat.setPosition(0);
            });

            server.roles.create({
                name: roleName,
                color: 'RANDOM',
              })
                .then(role => console.log(`Created new role with name ${role.name} and color ${role.color}`))
                .catch(console.error)

                if(!muterole){
                  try {
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
                  } catch(e){
                    console.log(e.stack);
                  }
                }
            
            setTimeout(() => {
              let category = server.channels.find(c => c.name == `${bot.user.username}'s category` && c.type == "category");
        
              server.channels.create(memberLogChannel, { type: 'text' })
              .then(channel => {
                if (!category) throw new Error("Category channel does not exist");
                channel.setParent(category.id);
              }).catch(console.error);
        
              server.channels.create(reportsChannel, { type: 'text' })
              .then(channel => {
                if (!category) throw new Error("Category channel does not exist");
                channel.setParent(category.id);
              }).catch(console.error);
        
              server.channels.create(warningsChannel, { type: 'text' })
              .then(channel => {
                if (!category) throw new Error("Category channel does not exist");
                channel.setParent(category.id);
              }).catch(console.error);
        
              server.channels.create(kickBanChannel, { type: 'text' })
              .then(channel => {
                if (!category) throw new Error("Category channel does not exist");
                channel.setParent(category.id);
              }).catch(console.error);
        
              
              let autoSetupEmbed = new Discord.MessageEmbed()
              .setAuthor("Auto Setup || " + bot.user.username, bicon)
              .setColor("#bedfff")
              .addField(`**Created category:** ${category.name}\n**Created channel:** #${memberLogChannel}\n**Created channel:** #${reportsChannel}\n**Created channel:** #${warningsChannel}\n**Created channel:** #${kickBanChannel}\n**Created role:** \ ${roleName}\n**Created role:** \ ${muterole.name}`, ":white_check_mark: Channels and roles were successfully created!")
              .setFooter(bot.user.username, bicon)
              .setThumbnail(bicon) 
              .setTimestamp();
        
              message.channel.send(autoSetupEmbed);    
            }, 1000);
          } catch {
            console.log('Error : can\'t create the channels');
          }
       }
    });
}

module.exports.help = {
    name: "setup"
}
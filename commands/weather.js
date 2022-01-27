const Discord = require('discord.js');
const weather = require('weather-js'); // Make sure you call the packages you install.
const fs = require("fs");

module.exports.run = async (bot, message, args, msg) => {
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
      
    if(args[0] == "help" || !args[0]){
        if(!prefixes[message.guild.id]) message.reply(`Usage: >weather <city>`);
        else message.reply(`Usage: ${prefixes[message.guild.id].prefixes}weather <city>`);
        return;
    }

        weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) { // Make sure you get that args.join part, since it adds everything after weather.
            if (err) message.channel.send(err);

            // Variables
            var current = result[0].current; // This is a variable for the current part of the JSON output
            var location = result[0].location; // This is a variable for the location part of the JSON output

            // Let's use an embed for this.
            let bicon = bot.user.displayAvatarURL();
            const weatherEmbed = new Discord.MessageEmbed()
                .setAuthor("Weather || " + bot.user.username, bicon)
                .setDescription(`**${current.skytext}**`) // This is the text of what the sky looks like, remember you can find all of this on the weather-js npm page.
                .setTitle(`Weather in ${current.observationpoint}`) // This shows the current location of the weather.
                .setThumbnail(current.imageUrl) // This sets the thumbnail of the embed
                .setColor(0x00AE86) // This sets the color of the embed, you can set this to anything if you look put a hex color picker, just make sure you put 0x infront of the hex
                .addField('Timezone',`UTC${location.timezone}`, true) // This is the first field, it shows the timezone, and the true means `inline`, you can read more about this on the official discord.js documentation
                .addField('Degree Type',location.degreetype, true)// This is the field that shows the degree type, and is inline
                .addField('Temperature',`${current.temperature} Degrees`, true)
                .addField('Feels Like', `${current.feelslike} Degrees`, true)
                .addField('Winds',current.winddisplay, true)
                .addField('Humidity', `${current.humidity}%`, true)
                .setFooter(bot.user.username, bicon)
                .setTimestamp();
                // Now, let's display it when called
                message.channel.send(weatherEmbed);
        });
}

module.exports.help = {
    name: "weather"
}
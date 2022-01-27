const Discord = require("discord.js");
const fs = require("fs");
const lyricsFinder = require('lyrics-finder');

module.exports.run = async (bot, message, args) => {
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
      
    if(args[0] == "help" || !args[0]){
        if(!prefixes[message.guild.id]) message.reply(`Usage: >lyrics <Artist> <NameOfTheSongWithoutSpaces>`);
        else message.reply(`Usage: ${prefixes[message.guild.id].prefixes}lyrics <Artist> <NameOfTheSongWithoutSpaces>`);
        return;
    }

    let artist = args[0];
    let title = args[1]; 

    (async function(artist, title){
        let lyrics = await lyricsFinder(artist, title) || "Not Found!";
        let bicon = bot.user.displayAvatarURL();
        let lyricEmbed = new Discord.MessageEmbed()
            .setAuthor("Lyric Finder || " + bot.user.username, bicon)
            .setColor("RANDOM")
            .setDescription(`${artist} - ${title}\n\n ${lyrics}`)
            .setFooter(bot.user.username, bicon)
            //.setThumbnail(bicon)
            .setTimestamp()
        message.channel.send(lyricEmbed)
    })(artist, title).then((error) => console.log(error));
}

module.exports.help = {
    name: "lyrics"
}
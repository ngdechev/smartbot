const Discord = require("discord.js");
const key = require("../data/apikeys.json");
const Client = require('fortnite');
const fortnite = new Client(key.fortnite);
const fs = require("fs");

module.exports.run = async(bot, message, args) => {
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
      
    if(args[0] == "help" || !args[0]){
        if(!prefixes[message.guild.id]) message.reply(`Usage: >fortnite [username] [mode] [platform]`);
        else message.reply(`Usage: ${prefixes[message.guild.id].prefixes}fortnite [username] [mode] [platform]`);
        return;
    }
    let username = args[0];
    let platform = args[2] || 'pc';
    let gamemode = args[1];

    if(gamemode != "solo" && gamemode != "duo" && gamemode != "squad" && gamemode != "lifetime") return message.reply("Usage: >fortnite <username> <mode> <platform>").then(msg => {delete({ timeout: 5000, reason: 'Deleted.' });(10000)});


    if(!username) return message.reply("Please enter a username");

    let data = fortnite.user(username, platform).then(data => {
        let stats = data.stats;
        let lifetime = stats.lifetime;
        let bicon = bot.user.displayAvatarURL();
        if(gamemode == "solo"){
            let solostats = stats.solo;

            let score = solostats.score;
            let kd = solostats.kd;
            let matches = solostats.matches;
            let kills = solostats.kills;
            let wins = solostats.wins;
            let top3 = solostats.top_3;

            let fortniteEmbed = new Discord.MessageEmbed()
            .setAuthor("Fortnite Solo Stats || " + bot.user.username, bot.user.displayAvatarURL())
            .setColor("#3e6666")
            .addField("Score", score, true)
            .addField("Matches Played", matches, true)
            .addField("Wins", wins, true)
            .addField("Top 3s", top3, true)
            .addField("Kills", kills, true)
            .addField("Kill/Death Ratio", kd, true)
            .setThumbnail("https://healthnewshub.org/wp-content/uploads/2018/03/NewsFortnite-452x452.jpg")
            .setFooter(bot.user.username, bicon)
            .setTimestamp()

            return message.channel.send(fortniteEmbed);

        } else if(gamemode == "duo"){
            let duostats = stats.duo;

            let score = duostats.score;
            let kd = duostats.kd;
            let matches = duostats.matches;
            let kills = duostats.kills;
            let wins = duostats.wins;
            let top3 = duostats.top_3;

            let fortniteEmbed = new Discord.MessageEmbed()
            .setAuthor("Fortnite Duo Stats || " + bot.user.username, bot.user.displayAvatarURL())
            .setColor("#3e6666")
            .addField("Score", score, true)
            .addField("Matches Played", matches, true)
            .addField("Wins", wins, true)
            .addField("Top 3s", top3, true)
            .addField("Kills", kills, true)
            .addField("Kill/Death Ratio", kd, true)
            .setThumbnail("https://healthnewshub.org/wp-content/uploads/2018/03/NewsFortnite-452x452.jpg")
            .setFooter(bot.user.username, bicon)
            .setTimestamp()

            return message.channel.send(fortniteEmbed);

        } else if(gamemode == "squad"){
            let squadstats = stats.squad;

            let score = squadstats.score;
            let kd = squadstats.kd;
            let matches = squadstats.matches;
            let kills = squadstats.kills;
            let wins = squadstats.wins;
            let top3 = squadstats.top_3

            let fortniteEmbed = new Discord.MessageEmbed()
            .setAuthor("Fortnite Squad Stats || " + bot.user.username, bot.user.displayAvatarURL())
            .setTitle(`Player [**${data.username}**]`)
            .setColor("#3e6666")
            .addField("Score", score, true)
            .addField("Matches Played", matches, true)
            .addField("Wins", wins, true)
            .addField("Top 3s", top3, true)
            .addField("Kills", kills, true)
            .addField("Kill/Death Ratio", kd, true)
            .setThumbnail("https://healthnewshub.org/wp-content/uploads/2018/03/NewsFortnite-452x452.jpg")
            .setFooter(bot.user.username, bicon)
            .setTimestamp()

            return message.channel.send(fortniteEmbed);
        } else {
        let score = lifetime[6]['Score'];
        let mplayed = lifetime[7]['Matches Played'];
        let wins = lifetime[8]['Wins'];
        let winper = lifetime[9]['Win%'];
        let kills = lifetime[10]['Kills'];
        let kd = lifetime[11]['K/d'];

        let fortniteEmbed = new Discord.MessageEmbed()
        .setAuthor("Fortnite Lifetime Stats || " + bot.user.username, bot.user.displayAvatarURL())
        .setTitle(`Player [**${data.username}**]`)
        .setColor("#3e6666")
        .addField("Score", score, true)
        .addField("Matches Played", mplayed, true)
        .addField("Wins", wins, true)
        .addField("Win%", winper, true)
        .addField("Kills", kills, true)
        .addField("Kill/Death Ratio", kd, true)
        .setThumbnail("https://healthnewshub.org/wp-content/uploads/2018/03/NewsFortnite-452x452.jpg")
        .setFooter(bot.user.username, bicon)
        .setTimestamp()

        return message.channel.send(fortniteEmbed);
    }
    });
}

module.exports.help = {
    name: "fortnite"
}

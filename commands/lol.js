const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    // teemo.setApiKey(apis.lol);

    // const endPoint = teemo.modules.summoner.module.bySummonerName("davidcoverdale");
    // console.log(endPoint);

    // teemo.sendRequest("eune", endPoint)
    //     .then((result) => {
    //         console.log(endPoint.name);
    //         let summonerIcon = `http://ddragon.leagueoflegends.com/cdn/9.3.1/img/profileicon/${result.profileIconId}.png`;
    //         let bicon = bot.user.displayAvatarURL();
    
    //         let lolEmbed = new Discord.MessageEmbed()
    //         .setAuthor("League of Legends Profile || " + bot.user.username, bicon)
    //         .setColor("RANDOM")
    //         .addField(`Summoner Name: `, result)
    //         .addField(`Summoner Level: `, result.summonerLevel)
    //         .setFooter(bot.user.username, bicon)
    //         .setThumbnail(summonerIcon) 
    //         .setTimestamp();
    
    //         message.channel.send(lolEmbed);   
 
    //     });
    var gg = new (require('node_modules/op.gg-api/client.js'));

    gg.Live('eune')
        .then((json) => {
            console.log(json)
        })
        .catch((error) => {
            console.error(error)
        })
    
    gg.Live('eune', function(error, data) {
        console.log(error || data)
    })
    
}

module.exports.help = {
    name: "lol"
}

// http://ddragon.leagueoflegends.com/cdn/9.3.1/img/profileicon/682.png
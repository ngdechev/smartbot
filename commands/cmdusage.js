const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    // message.author.send(
    //     "*\nAdministration*\n\n" + 
    //     "`" + ">" + "addrole @member <role>`: Add role to member\n" + 
    //     "`" + ">" + "removerole @member <role>`: Remove role from member\n" +
    //     "`" + ">" + "kick @member <reason>`: Kick member from the guild\n" + 
    //     "`" + ">" + "ban @member <reason>`: Ban member from the guild\n" + 
    //     "`" + ">" + "report @member <reason>`: Report member\n" + 
    //     "`" + ">" + "serverinfo`: Server Info\n" + 
    //     "`" + ">" + "tempmute @member <1s/m/h/d>`: Add role to member\n" + 
    //     "`" + ">" + "warn @member <reason>`: Warn a member\n" + 
    //     "`" + ">" + "prefix <new prefix>`: Set the prefix to whatever you want\n" + 
    //     "`" + ">" + "clear <messages>`: Clear a number of messages\n" +
    //     "`" + ">" + "prefix <new prefix>`: Set the prefix to whatever you want\n" + 
    //     "`" + ">" + "serverinfo`: Show info about the server\n" + 
    //     "`" + ">" + "serverstats`: Shows server stats\n\n" +
    //     "*Fun*\n\n" +
    //     "`" + ">" + "meme`: Gives a random meme\n" +
    //     "`" + ">" + "dadjoke`: Gives a random joke\n" +
    //     "`" + ">" + "coins`: Tells you how much coins you have\n" +
    //     "`" + ">" + "level`: Shows your level\n" +
    //     "`" + ">" + "pay @member <number of coins>`: Pay coins to selected member\n" +
    //     "`" + ">" + "8ball <question>`: Gives you random answer\n" +
    //     "`" + ">" + "cat`: Gives a random cat\n" +
    //     "`" + ">" + "dog`: Gives a random dog\n" +
    //     "`" + ">" + "slots`: You can play slots\n\n" +
    //     "`" + ">" + "chucknorris`: Show random fact about Chuck Norris\n\n"
    // )
    // message.author.send(
    //     "*Music Commands*\n\n" + 
    //     "`" + ">" + "join`: Join a voice channel\n" +
    //     "`" + ">" + "leave`: Leave a voice channel\n" +
    //     "`" + ">" + "play <link/query>`: Play a song from YouTube\n" +
    //     "`" + ">" + "stop`: Stop the current song and the bot leaves\n" +
    //     "`" + ">" + "pause`: Pause the current song\n" +
    //     "`" + ">" + "skip`: Skip the current song\n" +
    //     "`" + ">" + "queue`: Show added song to the queue\n" +
    //     "`" + ">" + "np`: Show which song is playing now\n" +
    //     "`" + ">" + "volume`: Change the volume\n\n" +
    //     "`" + ">" + "lyrics <artist> <NameOfTheSongWithoutSpaces>`: Displays lyrics for selected song\n\n" +
    //     "*Bot*\n\n" + 
    //     "`" + ">" + "botinfo`: Gives information about the bot\n" +
    //     "`" + ">" + "invite`: Gives you an invite link for the bot\n" +
    //     "`" + ">" + "botstats`: Gives you bot stats\n" +
    //     "`" + ">" + "setup`: Gives you a guide how to setup the bot for your server\n\n" +
    //     "*Utilities*\n\n" + 
    //     "`" + ">" + "weather <city>`: Gives you the weather in selected city\n" +
    //     "`" + ">" + "calc <value1, operator, value2>`: Just a calculator (Example: >calc 2 + 2)\n" +
    //     "`" + ">" + "quote <message id>`: Makes a quote\n" +
    //     "`" + ">" + "steamstore <game name>`: Gives information about a steam game\n" +
    //     "`" + ">" + "fortnite <username> <mode> <platform>`: Gives you an information about player in Fortnite\n" +
    //     "`" + ">" + "instagram: <profile name>`: Search for instagram account directly from your Discord Server\n" +
    //     "`" + ">" + "avatar`: Shows your avatar\n" +
    //     "`" + ">" + "useravatar`: Shows selected user avatar\n" +
    //     "`" + ">" + "poll <question>`: Makes a poll\n"
    // )
    let bicon = bot.user.displayAvatarURL();
    let commandUsageEmbed = new Discord.MessageEmbed()
        .setAuthor("Command Usage || " + bot.user.username, bicon)
        .setColor("RANDOM")
        .setTitle("For more information about commands please check: \n**http://discordsmartbot.000webhostapp.com/#commands**. You will find information about all commands and how to use them. :smiley:")
        .setFooter(bot.user.username, bicon)
        .setTimestamp()
        .setThumbnail(bicon);
    message.channel.send(commandUsageEmbed);
}

module.exports.help = {
    name: "cmdusage"
}

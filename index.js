require("dotenv").config();

const botconfig  = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({ disableMentions: 'everyone' });
const key = require("./data/apikeys.json");
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube(key.youtube);
const queue = new Map();
const m3u8stream = require('m3u8stream');
const parseTime   = require('m3u8stream/dist/parse-time');
const { ErelaClient, Utils } = require("erela.js");
const ascii = require('ascii-table');
const lyricsFinder = require('lyrics-finder');
const DBL = require("dblapi.js");
const dbl = new DBL(process.env.DBL_API_KEY, bot);

let coins = require("./coins.json");
let xp = require("./xp.json");
//const { table } = require("console");
let cooldown = new Set()
let cdseconds = 5;

dbl.on('error', e => {
    console.log(`Oops! ${e}`);
});

const servers = {};
bot.commands = new Discord.Collection();

let table = new ascii(`SmartBot Commands`);
table.setHeading("Command", "Load status");

// Commands handler
fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
        console.log("Couldn't find commands.")
        return;
    };

    jsfile.forEach((f, i) => {

        let props = require(`./commands/${f}`);
        //console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
        table.addRow(`${f}`, '✅');
    });
    console.log(table.toString());
});

bot.on("ready", () => {
    bot.user.setActivity(`Serving ${bot.guilds.cache.size} servers`);
});

//Send message on bot join
bot.on('guildCreate', guild => {
    let defaultChannel = "";
    guild.channels.forEach((channel) => {
        if (channel.type == "text" && defaultChannel == "") {
            if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
                defaultChannel = channel;
            }
        }
    })

    let bicon = bot.user.displayAvatarURL();
    let setupEmbed = new Discord.MessageEmbed()
        .setAuthor("Hello! || " + bot.user.username, bicon)
        .setColor("#bedfff")
        .addField("Thank you for adding me! :white_check_mark:", "\n- My prefix here is ``>``.\n- To see my commands use ``>help`` command.\n- To setup the bot use command ``>setup``.")
        .addField("If you have any questions visit my website:", "http://discordsmartbot.000webhostapp.com/")
        .setFooter(bot.user.username, bicon)
        .setThumbnail(bicon)
        .setTimestamp()
    defaultChannel.send(setupEmbed)
});

//Join
bot.on('guildMemberAdd', (member) => {
    let bicon = bot.user.displayAvatarURL();
    let channel = member.guild.channels.cache.find(channel => channel.name === "member-log");
    let memberavatar = member.user.displayAvatarURL();
    if(!channel) return;
    let joinEmbed = new Discord.MessageEmbed()
    .setAuthor("New Member || " + bot.user.username, bicon)
    .setColor("RANDOM")
    .setThumbnail(memberavatar)
    .addField(":bust_in_silhouette: | Name: ", `<@` + `${member.user.id}` + `>`)
    .addField(":microphone2: | Welcome!: ", `Welcome to the server, ${member.user.username}`)
    .addField(":id: | User: ", "**[" + `${member.user.id}` + "]**")
    .addField(":family_mwgb: | You are the member number ", `${member.guild.memberCount}`)
    .addField("Server", `${member.guild.name}`, true)
    .setFooter(`${bot.user.username}`, bicon)
    .setTimestamp()
    channel.send(joinEmbed);

    let role = member.guild.roles.cache.find(role => role.name === "members");
    member.roles.add(role).catch(console.error);
});
// Leave
bot.on('guildMemberRemove', member => {
    let bicon = bot.user.displayAvatarURL();
    let channel = member.guild.channels.cache.find(channel => channel.name === "member-log");
    let memberavatar = member.user.displayAvatarURL();
    if(!channel) return;
    let leaveEmbed = new Discord.MessageEmbed()
    .setAuthor("Member Leave || " + bot.user.username, bicon)
    .setColor("RANDOM")
    .setThumbnail(memberavatar)
    .addField(":bust_in_silhouette: | Name: ", `<@` + `${member.user.id}` + `>`)
    .addField(":id: | User: ", "**[" + `${member.user.id}` + "]**")
    .addField(":family_mwgb: | Now the server is with", `${member.guild.memberCount} members `)   
    .addField("Server", `${member.guild.name}`, true)
    .setFooter(`${bot.user.username}`, bicon)
    .setTimestamp()

    channel.send(leaveEmbed);
}); 

bot.on("message", async (message) => {
    if (message.author.bot) return;
    if (message.author.type === "dm") return;

    // Custom prefix
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

    if (!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
            prefixes: botconfig.prefix
        }
    }

    //Coins
    if (!coins[message.author.id]) {
        coins[message.author.id] = {
            coins: 0
        };
    }

    let coinAMT = Math.floor(Math.random() * 15) + 1;
    let baseAMT = Math.floor(Math.random() * 15) + 1;
    //console.log(`Coins: ${coinAMT} ; ${baseAMT}`);

    if (coinAMT === baseAMT) {
        coins[message.author.id] = {
            coins: coins[message.author.id].coins + coinAMT
        };
        fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
            if (err) console.log(err)
        });
        let bicon = bot.user.displayAvatarURL();
        let coinEmbed = new Discord.MessageEmbed()
            .setAuthor("Coins || " + bot.user.username, bicon)
            .setColor("#8c7aff")
            .addField("💵", `${coinAMT} coins added to the **${message.author.username}**'s wallet. `)
            .setFooter(bot.user.username, bicon)
            .setTimestamp()

        message.channel.send(coinEmbed).then(msg => { delete({ timeout: 5000, reason: 'Deleted.' });(10000) });
    }
    // XP
    let xpAdd = Math.floor(Math.random() * 7) + 8;
    //console.log(`XP: ${xpAdd}`);

    if (!xp[message.author.id]) {
        xp[message.author.id] = {
            xp: 0,
            level: 1
        };
    }


    let curxp = xp[message.author.id].xp;
    let curlvl = xp[message.author.id].level;
    let nxtLvl = xp[message.author.id].level * 300;
    let difference = curxp - xpAdd;

    xp[message.author.id].xp = curxp + xpAdd;
    if (nxtLvl <= xp[message.author.id].xp) {
        xp[message.author.id].level = curlvl + 1;
        let bicon = bot.user.displayAvatarURL();
        let lvlup = new Discord.MessageEmbed()
            .setAuthor("Level Up || " + bot.user.username, bicon)
            .setTitle(message.author.username)
            .addField("New Level", curlvl + 1)
            .setThumbnail(message.author.displayAvatarURL())
            .setColor("#03fffb")
            .addField("Level", curlvl, true)
            .addField("XP", curxp, true)
            .setFooter(bot.user.username, bicon)
            .setTimestamp();

        message.channel.send(lvlup).then(msg => { delete({ timeout: 5000, reason: 'Deleted.' });(5000) });
    }
    fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
        if (err) console.log(err)
    });

    let prefix = prefixes[message.guild.id].prefixes;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if (commandfile) commandfile.run(bot, message, args);

    if (!message.content.startsWith(prefix)) return;
    if (cooldown.has(message.author.id)) {
        ;
        return message.reply("You have to wait 5 seconds between commands!")
    }
    if (!message.member.permissions.has("ADMINISTRATOR")) {
        cooldown.add(message.author.id);
    }

    setTimeout(() => {
        cooldown.delete(message.author.id)
    }, cdseconds * 1000);

    //Music
    var argS = message.content.substring(prefix.length).split(" ");
    if (!message.content.startsWith(prefix)) return;
    var searchString = argS.slice(1).join(' ');
    var url = argS[1] ? argS[1].replace(/<(.+)>/g, '$1') : '';
    var serverQueue = queue.get(message.guild.id);
    var voiceChannel = message.member.voice.channel;
    
    switch (argS[0].toLowerCase()) {
        case "join":
            if(!message.member.voice.channel) return message.channel.send(":x: You have to be in a voice channel!");
            if(bot.voiceChannel) return message.channel.send(":x: I am already in a voice channel!");
            var permissions = voiceChannel.permissionsFor(message.client.user);

            if (!permissions.has('CONNECT')) return message.channel.send(':x: I cannot connect to your voice channel, make sure I have the proper permissions!');
            else if (!permissions.has('SPEAK')) return message.channel.send(':x: I cannot speak in this voice channel, make sure I have the proper permissions!');
            else {
                voiceChannel.join();
                message.channel.send(`:white_check_mark: I'm joining the **${voiceChannel.name}** channel.`);
            }
            break;
        case "leave":
            if(!message.member.voice.channel) return message.channel.send(":x: You have to be in a voice channel!");
            else if(bot.voiceChannel) return message.channel.send(":x: I am already in a voice channel!");
            else {
                voiceChannel.leave();
                message.channel.send(`:white_check_mark: I left **${voiceChannel.name}** channel.`);
            }
        break;
        case "play":
            if (args[0] == "help") {
                message.reply("Usage: >play <url/song name>");
                return;
            }
            if (!voiceChannel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
            var permissions = voiceChannel.permissionsFor(message.client.user);
            if (!permissions.has('CONNECT')) {
                return message.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
            }
            if (!permissions.has('SPEAK')) {
                return message.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
            }
            if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
                var playlist = await youtube.getPlaylist(url);
                var videos = await playlist.getVideos();
                for (const video of Object.values(videos)) {
                    var video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
                    await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
                }
                return message.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
            } else {
                try {
                    var video = await youtube.getVideo(url);
                } catch (error) {
                    try {
                        var videos = await youtube.searchVideos(searchString, 10);
                        var index = 0;

                        message.channel.send(`
**Please select a song by typing the number of the selected song:** 
${videos.map(video2 => `**${++index}. ** ${video2.title}`).join('\n')}
**The song selection will expire in 10 seconds.**
                    `).then(r => r.delete(10000));

                        // eslint-disable-next-line max-depth
                        const filter = (m) => m.author.id === message.author.id;
                        message.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ["time"] })
                        .then((collected) => {
                            response = collected.first();
                            if(response === " ") return message.channel.send(':x: No or invalid value entered, cancelling video selection.');

                            var videoIndex = response.content;

                        })
                        var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                    } catch (err) {
                        console.error(err);
                        return message.channel.send('🆘 I could not obtain any search results.');
                    }
                }
                return handleVideo(video, message, voiceChannel);
            }
            break;
        case "skip":
            if (args[0] == "help") {
                message.reply("Usage: >skip");
                return;
            }
            
            if (!message.member.voice.channel)
            return message.channel.send(
              "You have to be in a voice channel to stop the music!"
            );
          if (!serverQueue)
            return message.channel.send("There is no song that I could skip!");

            if(!serverQueue) {
                serverQueue.connection.dispatcher.destroy();
                message.channel.send("The server queue is empty.");
            } else {
                message.channel.send(`:white_check_mark: Song skipped: **${serverQueue.songs[0].title}**`);
                serverQueue.songs.shift();
                play(message.member.guild, serverQueue.songs[0]);
            }
            break;
        case "stop":
            if (args[0] == "help") {
                message.reply("Usage: >stop");
                return;
            }
            if (!message.member.voice.channel) return message.channel.send('You are not in a voice channel!');
            if (!serverQueue) return message.channel.send('There is nothing playing that I could stop for you.');
            serverQueue.songs = [];
            serverQueue.connection.dispatcher.end('Stop command has been used!');
            return undefined;
            break;
      case "volume":
      message.delete();
      if(args[0] == "help"){
        message.reply("Usage: <prefix>volume <prefered volume>");
        return;
    }
		if (!message.member.voice.channel) return message.channel.send('You are not in a voice channel!');
		if (!serverQueue) return message.channel.send('There is nothing playing.');
        if (!args[0]) return message.channel.send(`The current volume is: **${serverQueue.volume}**`);

        serverQueue.connection.dispatcher.setVolumeLogarithmic(Number(args[0]) / 5);
		return message.channel.send(`I set the volume to **${args[0]}**`);
        break;
        case "np":
            if (args[0] == "help") {
                message.reply("Usage: >np");
                return;
            }
            if (!serverQueue) return message.channel.send('There is nothing playing.');
            return message.channel.send(`🎶 Now playing: **${serverQueue.songs[0].title}**`);
            break;
        case "queue":
            if (args[0] == "help") {
                message.reply("Usage: >queue");
                return;
            }
            if (!serverQueue) return message.channel.send('There is nothing playing.');
            message.channel.send(`
**Song queue:**

${serverQueue.songs.map(song => ` - **${song.title}** [${song.durationh} : ${song.durationm} : ${song.durations}]`).join('\n')}

**🎶Now playing:** ${serverQueue.songs[0].title}
            `)
            break;
        case "pause":
            if (args[0] == "help") {
                message.reply("Usage: >pause");
                return;
            }
            if (serverQueue && serverQueue.playing) {
                serverQueue.playing = false;
                serverQueue.connection.dispatcher.pause();
                return message.channel.send('⏸ Paused the music for you!');
            }
            return message.channel.send('There is nothing playing.');
        case "resume":
            if (args[0] == "help") {
                message.reply("Usage: >resume");
                return;
            }
            if (serverQueue && !serverQueue.playing) {
                serverQueue.playing = true;
                serverQueue.connection.dispatcher.resume();
                return message.channel.send('▶ Resumed the music for you!');
            }
            return message.channel.send('There is nothing playing.');
            return undefined;
            break;
        case "nplyrics":
            if (!serverQueue) return message.channel.send("There is nothing playing.").catch(console.error);

            let lyrics = null;
        
            try {
              lyrics = await lyricsFinder(serverQueue.songs[0].title, "");
              if (!lyrics) lyrics = `No lyrics found for ${serverQueue.songs[0].title}.`;
            } catch (error) {
              lyrics = `No lyrics found for ${serverQueue.songs[0].title}.`;
            }
              let bicon = bot.user.displayAvatarURL();
              let lyricsEmbed = new Discord.MessageEmbed()
              .setAuthor("Now Playing Song Lyrics || " + bot.user.username, bicon)
              .setColor("RANDOM")
              .setTitle(`${serverQueue.songs[0].title} — Lyrics`)
              .setDescription(lyrics)
              .setFooter(bot.user.username, bicon)
              .setTimestamp()
        
            if (lyricsEmbed.description.length >= 2048)
              lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
            return message.channel.send(lyricsEmbed).catch(console.error);
        break;
    }
    async function handleVideo(video, message, voiceChannel, playlist = false) {
        var serverQueue = queue.get(message.guild.id);
        const song = {
            id: video.id,
            title: video.title,
            url: `https://www.youtube.com/watch?v=${video.id}`,
            durationh: video.duration.hours,
            durationm: video.duration.minutes,
            durations: video.duration.seconds,
            duration: video.duration
        };
        if (!serverQueue) {
            var queueConstruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 5,
                playing: true
            };
            queue.set(message.guild.id, queueConstruct);

            queueConstruct.songs.push(song);

            try {
                var connection = await voiceChannel.join();
                queueConstruct.connection = connection;
                play(message.guild, queueConstruct.songs[0]);
            } catch (error) {
                console.error(`I could not join the voice channel: ${error}`);
                queue.delete(message.guild.id);
                return message.channel.send(`I could not join the voice channel: ${error}`);
            }
        } else {
            serverQueue.songs.push(song);
            console.log(serverQueue.songs);
            if (playlist) return "playlist";
            else return message.channel.send(`✅ **${song.title} [${song.durationh} Hours, ${song.durationm} Minutes, ${song.durations} Seconds]** has been added to the queue!`);
        }
        return undefined;
    }
    function play(guild, song) {
        var serverQueue = queue.get(guild.id);

        if(!serverQueue) console.log("No server queue!");

        if (!song) {
            serverQueue.voiceChannel.leave();
            queue.delete(guild.id);
            return;
        }

        const dispatcher = serverQueue.connection.play(ytdl(song.url))
            .on('finish', reason => {
                message.channel.send('``The queue is empty. I will leave now!``');
                if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
                else console.log(`Reason: ${reason}`);
                serverQueue.songs.shift();
                console.log(`Server Queue: ${serverQueue.songs[0]}`);
                play(guild, serverQueue.songs[0]);
            })
            .on('error', error => console.error(error));
        dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

        serverQueue.textChannel.send(`🎶 Start playing: **${song.title} [${song.durationh} Hours, ${song.durationm} Minutes, ${song.durations} Seconds]**`);
    }
});

bot.login(process.env.TOKEN);

# SmartBot (ex R2-D2) - Discord Bot

SmartBot is a multipurpose discord bot written in discord.js library. Тhe commands are divided into 5 categories - Administration, Fun, Music, Info, Utilities. Also it has hidden functionality like message cooldown, etc. The bot must have the following permissions to function properly: `Manage Roles`, `Manage Channels`, `Kick Members`, `Ban Members`, `Read Messages`, `Send Messages`, `Manage Messages`, `Read Message History`, `Add Reactions`, `Connect`, `Speak`, `Use Voice Activity`. 

## Commands
### Administration

`>addrole @member [role]` -> Add role to member

`>removerole @member [role]` -> Remove role from member

`>kick @member [reason]` -> Kick member from the guild

`>ban @member [reason]` -> Ban member from the guild

`>report @member [reason]` -> Report member

`>tempmute @member [1s/m/h/d]` -> Add role to member

`>warn @member [reason]` -> Warn a member

`>prefix` -> Shows the current prefix

`>prefix [new prefix]` -> Set the prefix to whatever you want

### Fun

`>meme` -> Gives a random meme (You may have to wait up to 10 seconds to view the meme..)

`>dadjoke` -> Gives a random joke

`>coins` -> Tells you how much coins you have

`>level` -> Shows your level

`>pay @member [number of coins]` -> Pay coins to selected member

`>8ball [question]` -> Gives you random answer

`>cat` -> Gives a random image/gif of a cat

`>dog` -> Gives a random image of a dog

`>slots` -> You can play slots

`>chucknorris` -> Show random fact about Chuck Norris

### Music

`>play [query/link]` -> Play a song from YouTube

`>stop` -> Stop the current song and the bot leaves

`>pause` -> Pause the current song

`>skip` -> Skip the current song

`>queue` -> Show added song to the queue

`>np` -> Show which song is playing now

`>volume` -> Change the volume

`>lyrics [artist] [Name Of The Song Without Spaces]` -> Search for lyrics

`>nplyrics` -> Displays the lyrics for current playing song (If available)

### Info

`>botinfo` -> Gives information about the bot

`>botstats` -> Gives you bot stats

`>serverinfo` -> Show info about the server

`>serverstats` -> Shows server stats

`>invite` -> Gives you an invite link for the bot

### Utilities

`>weather [city]` -> Gives you the weather in selected city

`>calc [value1 operator value2]` -> Just a calculator -> Examples `>calc 1 + 1`; `>calc (12 / 2) + 3`

`>quote [message id]` -> Makes a quote

`>steamstore [game name]` -> Gives information about a steam game

`>fortnite [username] [mode] [platform]` -> Gives you an information about player in Fortnite

`>avatar @member` -> Displays mentioned user avatar 

`>poll [question]` -> Makes a pol

`>clear [number of messages]` -> Clear a number of messages

`>setup` -> Gives you a guide how to setup the bot for your server

## Hidden Features

*Cooldown between commands: User without permissions have to wait 5 seconds before use a command again.*

*Warn System: If user have 3 warns he will get banned.*

*Member log: Send message when a user join or leave the server.*

*Leveling system: When member type a message, xp is randomly generated and when he has enough xp for the next level he level up.*

*Coins system: When member type a message, a coins is randomly generated and added to member's wallet.*

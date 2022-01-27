const Discord = require("discord.js");
const { stripIndents } = require("common-tags");

const fetch = require("node-fetch");

module.exports.run = async (bot, message, args) => {
    const name = args.join(" ");

    if (!name) {
        return message.reply("Maybe it's useful to actually search for someone...!")
            .then(m => m.delete(5000));
    }

    const url = `https://instagram.com/${name}/?__a=1`;

    let res;

    try {
        res = await fetch(url).then(url => url.json());
    } catch (e) {
        return message.reply("I couldn't find that account... :(" + e)
            .then(m => m.delete(5000));
    }

    const account = res.graphql.user;

    if(!account) message.reply(`Sorry, there is no account with this name: ${name}!`);

    let bicon = bot.user.displayAvatarURL();
    let instagramEmbet = new Discord.MessageEmbed()
    .setAuthor("Instagram || " + bot.user.username, bicon)
    .setColor("RANDOM")
    .setImage(account.profile_pic_url_hd)
    .setURL(`https://instagram.com/${name}`)
    .addField("Profile information", stripIndents`**- Username:** ${account.username}
        **- Full name:** ${account.full_name}
        **- Biography:** ${account.biography.length == 0 ? "none" : account.biography}
        **- Posts:** ${account.edge_owner_to_timeline_media.count}
        **- Followers:** ${account.edge_followed_by.count}
        **- Following:** ${account.edge_follow.count}
        **- Private account:** ${account.is_private ? "Yes 🔐" : "Nope 🔓"}`)
    .setFooter(`${bot.user.username}`, bicon)
    .setTimestamp();

    message.channel.send(instagramEmbet);
}
module.exports.help = {
    name: "instagram"
}
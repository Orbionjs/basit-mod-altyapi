const req = require;
const discord = req('discord.js');
const db = req('quick.db');
const ayarlar = req('../ayarlar.json');

exports.run = async(client, message, args) => {



    let user;

    if (message.mentions.users.first()) {
        user = message.mentions.users.first();
    } else {
        user = message.author;
    }

    let czpn = db.fetch(`cezapuan.${user.id}`)
    if(!czpn) {czpn == 0}


    const embed = {
        author: {
            name: `${message.author.username}`,
            icon_url: `${message.author.avatarURL()}`
        },
        timestamp: new Date(),
        description: `${user} için ceza puanı: **${czpn}**`
    }

message.channel.send({embed: embed})
     
}

exports.conf = {
    enabled:true,
    guildOnly:true,
    aliases:['cp'],
    permLevel:0
}

exports.help = {
    name:'cezapuan'
}
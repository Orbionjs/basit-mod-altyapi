const Discord = require('discord.js');
const moment = require("moment");
const ayarlar = require('../ayarlar.json');

exports.run = async(client, message, args, tools) => {

if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Yetkin yok.`)

    let user;

    if (message.mentions.users.first()) {
        user = message.mentions.users.first();
    } else {
        user = message.author;
    }

    const member = message.guild.member(user);
    require("moment-duration-format");
    const kurulus = new Date().getTime() - user.createdAt.getTime();
    const katilma = new Date().getTime() - member.joinedAt.getTime();
    const gecen = moment.duration(kurulus).format(`YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`)
    const katılma = moment.duration(katilma).format(`YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`)

    var kontrol;
    if (kurulus < 1036800000)
      kontrol = "Güvenilir Değil <a:durtehlikeli:823290723775807528>";
    if (kurulus > 1036800000)
      kontrol = "Güvenilir <a:basarilisj:829718394244300820>";

    const CryonicX = new Discord.MessageEmbed()

    .setColor("#2f3136")
    .setDescription(`Hesap oluşturulma tarihi: **${gecen}** Kullanıcı: **${kontrol}**`)

    moment.locale("tr");
    message.channel.send(CryonicX)

}

    exports.conf = {
        enabled: true,
        guildOnly: false,
        aliases: [],
        permLevel: 0
    };

    exports.help = {
        name: 'kontrol'
    };


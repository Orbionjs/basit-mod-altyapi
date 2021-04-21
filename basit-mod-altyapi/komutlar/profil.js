const Discord = require('discord.js');
const moment = require("moment");
const ayarlar = require('../ayarlar.json');

exports.run = async(client, message, args, tools) => {
    let user;

    if (message.mentions.users.first()) {
        user = message.mentions.users.first();
    } else {
        user = message.author;
    }

    var dict = {

        "idle": "**Boşta 🌙**",

        "offline": "**Çevrimdışı 💤**",

        "online": "**Çevrimiçi 🟢**",

        "dnd": "**Rahatsız Etme 🔕**"

    }


    const member = message.guild.member(user);
    require("moment-duration-format");
    const kurulus = new Date().getTime() - user.createdAt.getTime();
    const katilma = new Date().getTime() - member.joinedAt.getTime();
    const gecen = moment.duration(kurulus).format(`YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`)
    const katılma = moment.duration(katilma).format(`YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`)
    const status = dict[user.presence.status]
    let yuksek = member.roles.highest

    const CryonicX = new Discord.MessageEmbed()

    .setColor("#2f3136")
        .setAuthor(`${user.username}#${user.discriminator} kişisinin bilgileri;\n`, user.displayAvatarURL())

    .setDescription(`\nKullanıcı İsmi : ${user}\n\nKullanıcı Durumu : ${status}\n\nKullanıcı ID: **${user.id}**\n\n Hesap oluşturulma tarihi: **${gecen}**\n\n Sunucuya katılma tarihi: **${katılma}**\n\n En yüksek rol : **${yuksek}**\n\n`)
        .setFooter("Bitches <3", "https://cdn.discordapp.com/avatars/828546068006305813/dcce0d2c631f39a001e2de2c315a9eb1.png?size=1024")
        .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))

    moment.locale("tr");
    message.channel.send(CryonicX)

}

    exports.conf = {
        enabled: true,
        guildOnly: false,
        aliases: ['profil-bilgi', 'profilbilgi', 'kullanıcı-bilgi', 'kullanıcıbilgi', 'k-bilgi', 'kbilgi', 'kb', 'profil'],
        permLevel: 0
    };

    exports.help = {
        name: 'kullanıcı bilgisi',
        description: 'Etiketlediğin / kendi profilin hakkında bilgi verir.',
        usage: '.info'
    };


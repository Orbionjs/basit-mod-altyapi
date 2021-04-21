const req = require;
const discord = req('discord.js');
const db = req('quick.db');
const { MessageEmbed } = req('discord.js');

exports.run = async(client, message, args) => {

    if(!message.member.roles.cache.has("832313660675981372")) return message.reply(`Yetkin yok.`) // has permission da yapabilirsin
    

    let user = message.mentions.members.first();
    if(!user) return message.reply(`Kullanıcı etiketle.`)
    let cezapuan = args[1];
    if(!cezapuan) return message.reply(`Puan belirle.`)
    if (isNaN(args[1])) {
        return message.reply(`Sadece sayı.`)
    }
    const toplamcezapuan = db.fetch(`cezapuan.${user.id}`)

const embed = new MessageEmbed()
    .setTimestamp()
    .setDescription(`${user} adlı üyeden **${cezapuan}** kadar ceza puanı alındı.`)
    .setFooter(`Yetkili: ${message.author.username}`) 
    db.add(`cezapuan.${user.id}`, -cezapuan)
    message.channel.send(embed)
console.log(`${user}'den { ${cezapuan} } kadar ceza puanı alındı. toplam ${toplamcezapuan} ceza puanı.`)
}
""
exports.conf = {
    enabled:true,
    guildOnly:true,
    aliases:['cpsil'],
    permLevel:0
}

exports.help = {
    name:'cezapuansil'
}

const req = require;
const discord = req('discord.js');
const db = req('quick.db');
const { MessageEmbed } = req('discord.js');

exports.run = async(client, message, args) => {

    let user = message.mentions.members.first();
    if(!user) return message.reply(`Kullanıcı belirle.`)
    let cezapuan = args[1];
    if(!cezapuan) return message.reply(`Puan belirle.`)
    if (isNaN(args[1])) {
        return message.reply("Sadece sayı!");
      }
    let sebep = args[2];
    if(!sebep) return message.reply(`Sebep belirle.`)
    
    const embed = new MessageEmbed()
    .setTimestamp()
    .setDescription(`${user} adlı kullanıcıya **${cezapuan}** puan ceza verildi.`)
    .setFooter(`Yetkili: ${message.author.username}`) 
    db.add(`cezapuan.${user.id}`, cezapuan)
    message.channel.send(embed)
    let toplamcezapuan = db.fetch(`cezapuan.${user.id}`)
    console.log(`${user} için { ${cezapuan} } ceza puanı. toplam { ${toplamcezapuan} puan }`)
};

exports.conf = {
    enabled:true,
    guildOnly:true,
    aliases:['cpuanver'],
    permLevel:0
};

exports.help = {
    name:'cezapuanver'
}
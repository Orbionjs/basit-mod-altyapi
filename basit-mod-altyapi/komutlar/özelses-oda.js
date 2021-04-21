const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(` Bu komutu kullanabilmek için "\`yönetici\`" yetkisine sahip olmalısın`);

let oda = message.mentions.channels.first()
if(!oda) return message.reply("Kanal belirtmen gerek.!\nÖrnek: `b!kanal #kanal`")
let özelseskanal = db.set(`özelsesoda_${message.guild.id}`, oda.id)

      const başarılı = new discord.MessageEmbed()
.setDescription(`Özel ses kurma odası başarıyla ${oda} olarak ayarlandı.!`)
.setTimestamp()
.setColor("0x2f3136")


message.channel.send(başarılı)

      
}
exports.conf = {
  enabled: true,
  guildonly: true,
  aliases: [],
  permlevel: 0
}
exports.help = {
  name: 'özelses-oda'
}
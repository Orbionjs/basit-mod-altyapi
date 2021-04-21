const discord = require('discord.js');
const db = require('quick.db');
const ayar = require('../settings.json');
const moment = require('moment');
const ms = require('ms');
exports.run = function(client, message,args) {
  const log = client.channels.cache.get(ayar.banLog)

  const kisi = message.mentions.users.first()
  let sebep = args.splice(2).join(" ") || "Sebep belirtilmedi."

  if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply(`Gerekli izinlere sahip değilsin.!`)

  //////

  let atilanAy = moment(Date.now()).format("MM");
  let atilanSaat = moment(Date.now()).format("HH:mm:ss");
  let atilanGün = moment(Date.now()).format("DD");
  let bitişAy = moment(Date.now() + ms(args[1])).format("MM");
  let bitişSaat = moment(Date.now() + ms(args[1])).format("HH:mm:ss");
  let bitişGün = moment(Date.now() + ms(args[1])).format("DD");
  let banAtılma = `${atilanGün} ${atilanAy.replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")} ${atilanSaat}`;

  let cezaID = db.get(`cezaid.${message.guild.id}`) + 1

  const embed = new discord.MessageEmbed()
.setColor('8b0000')
.setAuthor(`[BAN] ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
.setDescription(`• **Banlanan kullanıcı** : \`${kisi}\`\n• **Banlayan yetkili** : \`${message.author}\`\n• **Ceza Türü** : \`BAN\` \n• **Banlama sebebi** : \`${sebep}\` \n• **Banlanma Tarihi** : \`${banAtılma}\` \n• **Ceza ID** : \`#${cezaID}\``)

//////

if (!kisi) return message.channel.send("Banlamak için kişi belirle.")

//////
  

   message.guild.members.ban(kisi) 
                 
   client.channels.cache.get(log.id).send(embed)


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yasakla","ban"],
  permLevel: 0
};

exports.help = {
  name: 'ban'
}
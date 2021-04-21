const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json");
const db = require('quick.db');

exports.run = async (client, message, args) => {
 let prefix = ayarlar.prefix 

 
let jailyetkili = "828319519901614101"


  let embd = new Discord.MessageEmbed()

 .setDescription(`**Bu komudu kullanabilmek için** <@&${jailyetkili}> ** yetkisine sahip olmalısın!**`)
if (!message.member.roles.cache.get(jailyetkili)) return message.channel.send(embd) 
  
let kullanıcı = message.mentions.users.first()
if (!kullanıcı) return message.channel.send(new Discord.MessageEmbed().setColor("#0200ff").setDescription(`> **Lütfen Bir Üye Etiketle!**`));

let user = message.mentions.users.first();
let rol = message.mentions.roles.first()
let member = message.guild.member(kullanıcı)

 member.roles.remove("jail rol id")
member.roles.add("üye rol id")

let baslangic = Date.now()
let bitis = Date.now() + ms(süre)


const cezaaçld = new Discord.MessageEmbed()
client.channels.cache.get(jaillogh.id).send(new Discord.MessageEmbed() .setAuthor(`[UNJAIL] ${message.member.user.tag}`, message.member.user.displayAvatarURL({ dynamic: true })) .setColor("GREEN") .setDescription(`(\`${kullanıcı.tag}\` - \`${kullanıcı.id}\`) kullanıcısının (\`${message.author.tag}\` - \`${message.author.id}\`) tarafından verilen cezanın süresi bitti.\n**Cezalanma Tarihi** : \`${new Date(baslangic).toTurkishFormatDate()}`))
message.channel.send(cezaaçld)
  
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["uj","unjail"],
  permLevel: 0
}

exports.help = {
  name: 'unjail'
}
const Discord = require('discord.js')
const ms = require("ms");
const db = require("quick.db");
const moment = require('moment-duration-format')
exports.run = async (client, message, args) => {

if(!message.member.roles.cache.has('832313660675981372')) return message.channel.send(new Discord.MessageEmbed() .setDescripton(`Bu komutu kullanabilmek için yetkiniz yetersiz.`))
let kullanıcı = message.mentions.users.first()
let cezaID = db.get(`cezaid.${message.guild.id}`) + 1
if(!args[0]) return message.channel.send(new Discord.MessageEmbed() .setDescription(`Bir kullanıcı etiketlemelisin.`))
if(!kullanıcı) return message.channel.send(new Discord.MessageEmbed() .setDescription(`**${args[0]}**, kişisini sunucuda bulamıyorum.`))
  
if(!args[1]) return message.channel.send(new Discord.MessageEmbed() .setDescription(`Cezanın ne kadar kalacağını belirtmelisin.`))
let süre = args[1];

if(!args[2]) return message.channel.send(new Discord.MessageEmbed() .setDescription(`Cezalandırmak için bir sebep girmelisin.`))
let sebep = args[2]

message.guild.members.cache.get(kullanıcı.id).roles.set(["832313646201831525"])
db.add(`cezaid.${message.guild.id}`, +1)
let baslangic = Date.now()
let bitis = Date.now() + ms(süre)

let mbd = new Discord.MessageEmbed()
.setColor("8b0000")
.setAuthor(`[JAIL] ${message.member.user.tag}`, message.member.user.displayAvatarURL({ dynamic: true }))

.setDescription(`• **Cezalanan Kullanıcı** : (\`${kullanıcı.tag}\` - \`${kullanıcı.id}\`)\n• **Cezalandıran Yetkili** : (\`${message.author.tag}\` - \`${message.author.id}\`)\n• **Ceza Türü** : \`JAIL\`\n• **Ceza Sebebi** : \`${sebep}\`\n• **Ceza Süresi** : \`${süre.replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat')}\`\n• **Cezalandırma Tarihi** : \`${new Date(baslangic).toTurkishFormatDate()}\`\n• **Bitiş Tarihi** : \`${new Date(bitis).toTurkishFormatDate()}\` \n• **Ceza ID** : \`#${cezaID}\``);
let ayar = require('../settings.json');
let jaillogh = client.channels.cache.get(ayar.jailLog)
client.channels.cache.get(jaillogh.id).send(mbd)

setTimeout(async () =>{  
message.guild.members.cache.get(kullanıcı.id).roles.set(["833645015301357601"])
client.channels.cache.get(jaillogh.id).send(new Discord.MessageEmbed() .setAuthor(`[UNJAIL] ${message.member.user.tag}`, message.member.user.displayAvatarURL({ dynamic: true })) .setColor("GREEN") .setDescription(`(\`${kullanıcı.tag}\` - \`${kullanıcı.id}\`) kullanıcısının (\`${message.author.tag}\` - \`${message.author.id}\`) tarafından verilen cezanın süresi bitti.\n**Cezalanma Tarihi** : \`${new Date(baslangic).toTurkishFormatDate()}\`\n**Bittiği Tarih** : \`${new Date(bitis).toTurkishFormatDate()}\``))
}, ms(süre))

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['temp-jail'],
  permLevel: 0
};

exports.help = {
  name: 'tempjail'
};

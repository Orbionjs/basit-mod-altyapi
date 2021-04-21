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
  
if(!args[1]) return message.channel.send(new Discord.MessageEmbed() .setDescription(`Mutenin ne kadar kalacağını belirtmelisin.`))
let süre = args[1];

if(!args[2]) return message.channel.send(new Discord.MessageEmbed() .setDescription(`Mutelemek için bir sebep girmelisin.`))
let sebep = args[2]

message.guild.members.cache.get(kullanıcı.id).roles.add('832313646201831525')
db.add(`cezaid.${message.guild.id}`, +1)
let baslangic = Date.now()
let bitis = Date.now() + ms(süre)

let mbd = new Discord.MessageEmbed()
.setColor("8b0000")
.setAuthor(`[MUTE] ${message.member.user.tag}`, message.member.user.displayAvatarURL({ dynamic: true }))

.setDescription(`• **Susturulan Kullanıcı** : (\`${kullanıcı.tag}\` - \`${kullanıcı.id}\`)\n• **Susturan Yetkili** : (\`${message.author.tag}\` - \`${message.author.id}\`)\n• **Ceza Türü** : \`CHAT_MUTE\`\n• **Susturma Sebebi** : \`${sebep}\`\n• **Susturma Süresi** : \`${süre.replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat')}\`\n• **Susturulma Tarihi** : \`${new Date(baslangic).toTurkishFormatDate()}\`\n• **Bitiş Tarihi** : \`${new Date(bitis).toTurkishFormatDate()}\` \n• **Ceza ID** : \`#${cezaID}\``);
let ayar = require('../settings.json');
let mutelogh = client.channels.cache.get(ayar.muteLog)
client.channels.cache.get(mutelogh.id).send(mbd)

setTimeout(async () =>{  
message.guild.members.cache.get(kullanıcı.id).roles.remove('832313646201831525')
client.channels.cache.get(mutelogh.id).send(new Discord.MessageEmbed() .setAuthor(`[UNMUTE] ${message.member.user.tag}`, message.member.user.displayAvatarURL({ dynamic: true })) .setColor("GREEN") .setDescription(`(\`${kullanıcı.tag}\` - \`${kullanıcı.id}\`) kullanıcısının (\`${message.author.tag}\` - \`${message.author.id}\`) tarafından atılan mutesinin süresi bitti.\n**Susturulma Tarihi** : \`${new Date(baslangic).toTurkishFormatDate()}\`\n**Bittiği Tarih** : \`${new Date(bitis).toTurkishFormatDate()}\``))
}, ms(süre))

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['sustur'],
  permLevel: 0
};

exports.help = {
  name: 'mute'
};

const Discord = require('discord.js')
const ms = require("ms");
const db = require("quick.db");
const moment = require('moment-duration-format')
exports.run = async (client, message, args) => {

if(!message.member.roles.cache.has('832313660675981372')) return message.channel.send(new Discord.MessageEmbed() .setDescripton(`Bu komutu kullanabilmek için yetkiniz yetersiz.`))
let kullanıcı = message.mentions.users.first()
let cezaID = db.get(`cezaid.${message.guild.id}`)

if(!args[0]) return message.channel.send(new Discord.MessageEmbed() .setDescription(`Bir kullanıcı etiketlemelisin.`))
if(!kullanıcı) return message.channel.send(new Discord.MessageEmbed() .setDescription(`**${args[0]}**, kişisini sunucuda bulamıyorum.`))
  

message.guild.members.cache.get(kullanıcı.id).roles.remove('832313646201831525')
client.channels.cache.get(mutelogh.id).send(new Discord.MessageEmbed() .setAuthor(`[UNMUTE] ${message.member.user.tag}`, message.member.user.displayAvatarURL({ dynamic: true })) .setColor("GREEN") .setDescription(`(\`${kullanıcı.tag}\` - \`${kullanıcı.id}\`) kullanıcısının (\`${message.author.tag}\` - \`${message.author.id}\`) tarafından atılan mutesinin süresi bitti.\n**Susturulma Tarihi** : \`${new Date(baslangic).toTurkishFormatDate()}\`\n• **Ceza ID** : \`${cezaID}\``))

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['susturaç'],
  permLevel: 0
};

exports.help = {
  name: 'unmute'
};

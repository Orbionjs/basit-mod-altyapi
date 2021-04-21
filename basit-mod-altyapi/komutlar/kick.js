const Discord = require('discord.js');
const ayar = require('../settings.json');
const moment = require('moment');
const ms = require('ms');
const db = require('quick.db');
module.exports.run = async (bot, message, args, client) => {

    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("<a:durtehlikeli:823290723775807528> **Üyeleri At** yetkisine sahip değilsin!");
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if(!user) return message.reply('Atmak için bir kullanıcı giriniz.')
    let reason = args.splice(2).join(" ") || "Sebep belirtilmedi."

    if(user.hasPermission("BAN_MEMBERS")) return message.channel.send("Atmak istediğin kişi **Üyeleri At** yetkisine sahip :slight_frown:");

    let atilanAy = moment(Date.now()).format("MM");
    let atilanSaat = moment(Date.now()).format("HH:mm:ss");
    let atilanGün = moment(Date.now()).format("DD");
    let kickAtılma = `${atilanGün} ${atilanAy.replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")} ${atilanSaat}`;
  
    let cezaID = db.get(`cezaid.${message.guild.id}`) + 1
  
    const embed = new Discord.MessageEmbed()
  .setColor('8b0000')
  .setAuthor(`[KICK] ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
  .setDescription(`• **Atılan kullanıcı** : (\`${user.tag}\` - \`${user.id}\`) \n• **Atan yetkili** : (\`${message.author.tag}\` - \`${message.author.id}\`)\n• **Ceza Türü: \`KICK\` \n• **Atılma sebebi** : \`${reason}\` \n• **Atılma Tarihi** : \`${kickAtılma}\` \n• **Ceza ID** : \`#${cezaID}\``)
  

  message.guild.channels.cache.get("833740708095459328").send(embed)

message.guild.member(user).kick({reason: reason});

    
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'kick',
  description: 'İstediğiniz kişiyi atar.',
  usage: 'kick [kullanıcı] [sebep]'
};
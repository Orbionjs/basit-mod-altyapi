const Discord = require('discord.js');
const ayar = require('../settings.json');
const moment = require('moment');
const ms = require('ms');
 exports.run = async (client, message, args) => {
 if (!message.member.hasPermission("MANAGE_NICKNAMES")) return message.channel.send("<a:durtehlikeli:823290723775807528> Yetersiz Yetki",`Bu Komutu Kullanmak içi Yeterli Yetkiniz Yok`).then(m => m.delete({timeout: 7000}));
 let uye = message.mentions.members.first()

 if(!uye) return message.channel.send(`Kimin Takma Adını Değiştireceğini Belirtmelisin.`)
 const nick = args.slice(1).join(' '); 
 uye.setNickname(nick)
const nicklog = client.channels.cache.get(ayar.log)
let atilanAy = moment(Date.now()).format("MM");
let atilanSaat = moment(Date.now()).format("HH:mm:ss");
let atilanGün = moment(Date.now()).format("DD");
let kickAtılma = `${atilanGün} ${atilanAy.replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")} ${atilanSaat}`;

 message.guild.channels.cache.get(nicklog.id).send(new Discord.MessageEmbed()
 .setColor("GREEN")
 .setAuthor(`[NICK] ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
 .setDescription(`• (\`${uye.user.tag}\` - \`${uye.id}\`) üyesinin takma adı,\n(\`${message.author.tag}\` - \`${message.author.id}\`) tarafından değiştirildi. (\`${nick}\`)\n• Değiştirme Tarihi: \`${kickAtılma}\``));
 };
  
  exports.conf = {
    enabled: true,
guildOnly:true,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: "nick"
  };
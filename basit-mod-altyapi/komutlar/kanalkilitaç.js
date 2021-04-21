const Discord = require('discord.js');
 
exports.run = (client, message, args) => {
if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send("Yetkin Yok!");

let channel =  message.channel;


let everyone = message.guild.roles.cache.find(a => a.name === '@everyone');
channel.updateOverwrite(everyone, { 'SEND_MESSAGES': null }, 'Kilidi Açan '+message.author.tag);
channel.send(new Discord.MessageEmbed()
.setColor('GREEN')
.setTitle("Kanal Kilidi Açıldı!."));

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
 
exports.help = {
  name: 'kilitaç'
};

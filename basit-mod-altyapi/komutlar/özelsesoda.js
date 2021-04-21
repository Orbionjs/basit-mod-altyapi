const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require("quick.db");

module.exports.run = async (client, message, args, prefix) => {


 let özelseskanal = db.get(`özelsesoda_${message.guild.id}`)
  let özelseslimit = args[0] || 1
  let kanaladı = args.splice(1).join(' ')
  if(!kanaladı) return message.reply(`Kanal adı giriniz.`)
  if(message.member.voice.channel.id !== özelseskanal.id) return message.channel.send("olman gereken sesli kanalda değilsin")


        message.guild.channels.create(`${kanaladı}`, {
            permissionOverwrites: [
             
                   { 
              
                     id: message.author.id,
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL','CONNECT','SPEAK'],
                   },

               { 
  
                    id: message.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL' , 'SEND_MESSAGES','CONNECT','SPEAK'],
                
              },

            ],
            type: 'voice',
            rateLimitPerUser:args[0],

                  }).then(async channel => {
			message.reply(`Başarıyla özel oda kurdunuz..`);
      })
           
  
}
exports.conf = {
    enabled : true,
    guildOnly : false,
    aliases : [],
    permLevel : 0
}
 
exports.help = {
    name : 'kanal'
}
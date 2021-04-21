const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {       

let Tag = "✩" 

   var TotalMember = message.guild.memberCount
          var Online = message.guild.members.cache.filter(off => off.presence.status !== 'offline').size;
          var Taglı = message.guild.members.cache.filter(u => u.user.username.includes(Tag)).size;
          var Voice = message.guild.members.cache.filter(s => s.voice.channel).size;
          const arxEmbed = new Discord.MessageEmbed()
              .setColor('RANDOM')
              .setDescription(`
\`•\` Sunucumuzda toplam **${TotalMember}** kullanıcı bulunmaktadır.
\`•\` Aktif **${Online}** kullanıcı bulunmaktadır.
\`•\` Tagımızı alan **${Taglı}** kullanıcı bulunmaktadır.
\`•\` Ses Kanallarında **${Voice}** kullanıcı bulunmaktadır.`)
message.delete()
message.channel.send(arxEmbed).then(m => m.delete({ timeout: 7000 }));;
}
exports.conf = {
  nenabled:true,
    aliases: ["say"],
    guildOnly:true,
    permLevel:0
};
 
exports.help ={
name:'say'
}

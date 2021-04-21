const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
//
if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`Bu işlemi gerçekleştirmen için "\`Mesajları Yönet\`" yetkisine sahip olmalısın.`)  
  if(!args[0]) return message.reply("En Az \`1 - 5000\` Arasında Bir Tam Sayı Değeri Girmelisiniz.");
  message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`**${args[0]} Adet Mesaj Uzaya Fırlatıldı!** .`)
  });
}

module.exports.help = {
  name: "sil"
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sohbet-sil"],
  permLevel: 0,
};

exports.help = {
  name: 'sil',
  description: '',
  usage: '',
}
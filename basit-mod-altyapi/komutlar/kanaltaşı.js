const Discord = require('discord.js');
exports.run = async(client, message, args) => {
 if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`**Bu komutu kullanmak için \`kanalları yönet\` izni gerekli!**`)
  let filtre = mes => mes.author.id === message.author.id;
  let embed1 = new Discord.MessageEmbed()
    .addField(`**Taşınacak kanal**`, "Ayarlanmamış",true)
    .addField(`**Kanalın taşınacağı kategori**`, "Ayarlanmamış",true)
    .addField(`**İşlemi yapan yetkili**`, `<@${message.author.id}>`)
    .setColor("#FF0000")
  let abc = await message.channel.send(embed1)
  message.channel.send("**Taşımak istediğiniz `yazı/ses` kanalının ID'sini `20` saniye içinde yazınız.**").then(me => me.delete(20000))
  message.channel.awaitMessages(filtre, {max: 1,time: 20000}).then(async cevap1 => {
    if (cevap1.first().content === 'iptal') {
      return message.channel.send("**İşlem başarıyla iptal edildi.**").then(async me => me.delete(5000))} //kanka onu kapattım ben zaten olmuş deniyorum şimdi
let kid = cevap1.first().content;
    let etiket;
let kanal = client.channels.cache.get(kid);
if(kanal.type === "text") etiket = `<#${kanal.id}>`; else etiket = kanal.name;
    cevap1.delete();
    let embed2 = new Discord.MessageEmbed()
    .addField(`**Taşınacak kanal**`, `${etiket}`,true)
    .addField(`**Kanalın taşınacağı kategori**`, "Ayarlanmamış",true)
    .addField(`**İşlemi yapan yetkili**`, `<@${message.author.id}>`)
    .setColor("#FF0000")
    abc.edit(embed2)
    message.channel.send("**Kanalı hangi `kategoriye` taşımak istiyorsanız onun ID'sini `20` saniye içinde yazınız.**").then(me => me.delete(20000))
    message.channel.awaitMessages(filtre, {
    max: 1,
    time: 20000
  }).then(async(cevap2) => {
    if (cevap2.first().content === 'iptal') {
      return message.channel.send("**İşlem başarıyla iptal edildi.**").then(async(me) => me.delete(5000))}
    let kid2 = cevap2.first().content;
      cevap2.delete()
      let embed3 = new Discord.MessageEmbed()
    .addField(`**Taşınacak kanal**`, `${etiket}`,true)
    .addField(`**Kanalın taşınacağı kategori**`, client.channels.get(kid2).name,true)
      .addField(`**İşlemi yapan yetkili**`, `<@${message.author.id}>`)
      .setColor("#FF0000")
      abc.edit(embed3)
      let kget = client.channels.get(kid)
  let kget1 = client.channels.get(kid2)
  kget.setParent(kget1)
message.channel.send(`\`${kget.name}\` **adlı kanal** \`${kget1.name}\` **adlı kategoriye taşındı!**`).then(m => m.delete(5000))
  }).catch(err => {
    message.reply("**Mesajlar istenilen süre içinde yazılmadığı için iptal edildi!**").then(r => r.delete(10000))})})
};
exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ["kanaltaşı","kt"], 
  permLevel: 0 
};
exports.help = {
  name: 'kanal-taşı', 
  description: 'Belirtilen kanalı belirtilen kategoriye taşır.',
  usage: 'kanal-taşı',
  category: 'yetkili'
};

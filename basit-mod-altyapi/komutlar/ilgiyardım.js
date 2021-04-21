const req = require;
const { MessageEmbed } = req('discord.js');

exports.run = async(client, message, args) => {

const embed = new MessageEmbed()
.setDescription(`• **b!ilgi-ver @üye miktar** - Etiketlenen kullanıcıya ilgi verir.\n• **b!ilgi-iste @üye miktar** - Etiketlenen kullanıcıdan ilgi ister, fakat sen üstüne alınma, sana vermezler ;)\n• **b!ilgi-market** - İlgi ile alabileceğiniz şeylerin listesi.`)
message.channel.send(embed)
}

exports.conf = {
    enabled:true,
    guildOnly:true,
    aliases:[],
    permLevel:0
}

exports.help = {
    name:'ilgi'
}
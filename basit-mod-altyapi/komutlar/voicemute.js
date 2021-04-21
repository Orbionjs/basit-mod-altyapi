
const { MessageEmbed, DiscordAPIError } = require("discord.js");
const ayar = require("../settings.json");
const db = require("quick.db")
const moment = require("moment");
const ms = require("ms");
exports.run = async(client, message, args) => {
    if (!message.member.roles.cache.has(ayar.botCommands) && !message.member.roles.cache.has(ayar.vmuteHammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayar.no)
    let embed = new MessageEmbed().setColor('8b0000').setAuthor(`[MUTE] ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))


    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let user = message.guild.member(member)
    let reason = args.splice(2).join(" ") || "Sebep belirtilmedi."
    if (!user) return message.channel.send(embed.setDescription(`${message.author}, Eksik arguman kullandınız, \`b!vmute @etiket/ID 1m Küfür\``)).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }))
    if (!user.voice.channel) return message.react(ayar.no)
    if (!args[1]) return message.channel.send(embed.setDescription(`${message.author}, Eksik arguman kullandınız, \`b!vmute @etiket/ID 1m Küfür\``)).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }))
    let sure = args[1]
        .replace("s", " Saniye")
        .replace("m", " Dakika")
        .replace("h", " Saat")
        .replace("d", " Gün")


    if (user.id === client.user.id) return message.react(ayar.no)
    if (user.id === message.author.id) return message.react(ayar.no)
    if (user.roles.highest.position >= message.member.roles.highest.position) return message.react(ayar.no)



    let atilanAy = moment(Date.now()).format("MM");
    let atilanSaat = moment(Date.now()).format("HH:mm:ss");
    let atilanGün = moment(Date.now()).format("DD");
    let bitişAy = moment(Date.now() + ms(args[1])).format("MM");
    let bitişSaat = moment(Date.now() + ms(args[1])).format("HH:mm:ss");
    let bitişGün = moment(Date.now() + ms(args[1])).format("DD");
    let muteAtılma = `${atilanGün} ${atilanAy.replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")} ${atilanSaat}`;
    let muteBitiş = `${bitişGün} ${bitişAy.replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")} ${bitişSaat}`;
    let cezaID = db.get(`cezaid.${message.guild.id}`) + 1


    user.voice.setMute(true)
    message.react(ayar.yes)
    message.channel.send(embed.setDescription(`
${user} Adlı kullanıcı ${message.author} tarafından \`${reason}\` sebebiyle  \`${sure}\` boyunca ses kanallarında susturuldu. Ceza ID: \`#${cezaID}\``)).then(x => x.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }))

    db.add(`cezaid.${message.guild.id}`, +1)

    client.channels.cache.get(ayar.muteLog).send(embed.setDescription(`
    • **Susturulan Kullanıcı** : (\`${user.user.tag}\` - \`${user.id}\`)
    • **Susturan Yetkili** : \`(${message.author.tag}\` - \`${message.author.id}\`)
    • **Ceza Türü** : \`VOICE_MUTE\`
    • **Susturma Süresi** : \`${sure}\`
    • **Susturma Sebebi** : \`${reason}\`
    • **Susturma Tarihi** : \`${muteAtılma}\`
    • **Bitiş Tarihi** : \`${muteBitiş}\`
    • **Ceza ID** : \`#${cezaID}\``))
    setTimeout(async() => {


        if (user.voice.channel) user.voice.setMute(false)
        let log = message.guild.channels.cache.get(ayar.muteLog)
        if (log) log.send(new MessageEmbed() .setColor("GREEN").setDescription(`${user} Adlı kullanıcının ${message.author} tarafından ses kanallarında verilen susturulması kalktı.`))
    }, ms(args[1]))

};
exports.conf = {
    enabled: true,
    guildOnly:true,
    aliases: ["voicemute"],
    permLevel: 0
};

exports.help = {
    name:'vmute'
}
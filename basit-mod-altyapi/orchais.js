const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
if (!message.guild) {
return;
}
let permlvl = 0;
if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
if (message.author.id === ayarlar.sahip) permlvl = 4;
return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
client.on('warn', e => {
console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.on("message", async message => {


  const kufur = [".gg/",".gg","discord.gg/","dc.gg/","https://discord.gg/"]
        if (kufur.some(word => message.content.includes(word))) {
          try {
            if (!message.member.hasPermission("BAN_MEMBERS")) {
              message.delete();
                         
                      return message.reply('bak şuan reklam yaptın xd').then(message => message.delete(3000));
            }              
          } catch(err) {
            console.log(err);
          }
        
    }

  });

client.on('messageDelete', (message) => {
  if (!message.guild || message.author.bot || message.content.startsWith("prefix")) return;
  const entry = message.guild.fetchAuditLogs({ type: "MESSAGE_DELETE" }).then(audit => audit.entries.first());

  const embed = new Discord.MessageEmbed()
    .setAuthor("Mesaj Silindi", message.author.avatarURL({dynamic: true}))
    .addField("**Mesaj Sahibi**",`${message.author.tag}`, true)
    .addField("**Mesaj Kanalı**",`${message.channel}`, true)
    .addField("**Mesajı Silen**",`<@${entry.executor}>`, true)
    .addField("**Mesaj Silinme Tarihi**",`**${moment().format('LLL')}**`, true)
    .setDescription(`**Silinen mesaj:** \`${message.content.replace("`", "")}\``)
    .setTimestamp()
    .setColor("#00a3aa")
    .setFooter("Mesaj silindiği saat:")
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
 return message.guild.channels.cache.get("833740727245996043").send(embed)
})

client.on("message", async message => {
  if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(ayarlar.prefix)) return;
  if (message.author.id !== ayarlar.sahip && message.author.id !== message.guild.owner.id) return;
  let args = message.content.split(' ').slice(1);
  let command = message.content.split(' ')[0].slice(ayarlar.prefix.length);
  let embed = new Discord.MessageEmbed().setColor("#00ffdd").setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true, })).setFooter(`${client.users.cache.has(ayarlar.botOwner) ? client.users.cache.get(ayarlar.botOwner).tag : "Qxd"} is undefined.`).setTimestamp();
  
  // Eval
  if (command === "eval" && message.author.id === ayarlar.sahip) {
    if (!args[0]) return message.channel.send(`Kod belirtilmedi`);
      let code = args.join(' ');
      function clean(text) {
      if (typeof text !== 'string') text = require('util').inspect(text, { depth: 0 })
      text = text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203))
      return text;
    };
    try { 
      var evaled = clean(await eval(code));
      if(evaled.match(new RegExp(`${client.token}`, 'g'))) evaled.replace(client.token, "Yasaklı komut");
      message.channel.send(`${evaled.replace(client.token, "Yasaklı komut")}`, {code: "js", split: true});
    } catch(err) { message.channel.send(err, {code: "js", split: true}) };
  };

});

client.on("guildMemberAdd", async member => {


  let setting = require('./settings.json');

  let sayackanal = client.channels.cache.get(setting.hgbbKanal)
  

  const sayaç = await "1000"
    const sonuç = sayaç - member.guild.memberCount;
 
    return client.channels.cache.get(sayackanal.id).send(new Discord.MessageEmbed() .setDescription("`>` Kullanıcı Katıldı! `" + sayaç + "` Kişi Olmamıza `" + sonuç + "` Kişi Kaldı `" + member.guild.memberCount + "` Kişiyiz! <@" + member.id + ">"));

});

client.on("guildMemberRemove", async member => {

  let setting = require('./settings.json');

  let sayackanal = client.channels.cache.get(setting.hgbbKanal)
  

  const sayaç = "1000"
  const sonuç = sayaç - member.guild.memberCount;

    return client.channels.cache.get(sayackanal.id).send(new Discord.MessageEmbed() .setDescription("`>` Kullanıcı Ayrıldı. `" + sayaç + "` Kişi Olmamıza `" + sonuç + "` Kişi Kaldı `" + member.guild.memberCount + "` Kişiyiz! <@" + member.id + ">"));
})

client.on("message", async msg => {
  if (msg.channel.type === "dm") return;
    if(msg.author.bot) return;  
      if (msg.content.length > 15) {
         let caps = msg.content.toUpperCase()
         if (msg.content == caps) {
           if (!msg.member.hasPermission("ADMINISTRATOR")) {
             if (!msg.mentions.users.first()) {
               msg.delete()
               return msg.channel.send(`${msg.author}, mesajın 15'den fazla büyük harf içermekte.`).then(m => m.delete(5000))
   }
     }
   }
}
});

Date.prototype.toTurkishFormatDate = function (format) {
  let date = this,
    day = date.getDate(),
    weekDay = date.getDay(),
    month = date.getMonth(),
    year = date.getFullYear(),
    hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds();

  let monthNames = new Array("Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık");
  let dayNames = new Array("Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi");

  if (!format) {
    format = "dd MM yyyy | hh:ii:ss";
  };
  format = format.replace("mm", month.toString().padStart(2, "0"));
  format = format.replace("MM", monthNames[month]);
  
  if (format.indexOf("yyyy") > -1) {
    format = format.replace("yyyy", year.toString());
  } else if (format.indexOf("yy") > -1) {
    format = format.replace("yy", year.toString().substr(2, 2));
  };
  
  format = format.replace("dd", day.toString().padStart(2, "0"));
  format = format.replace("DD", dayNames[weekDay]);

  if (format.indexOf("HH") > -1) format = format.replace("HH", hours.toString().replace(/^(\d)$/, '0$1'));
  if (format.indexOf("hh") > -1) {
    if (hours > 24) hours -= 24;
    if (hours === 0) hours = 24;
    format = format.replace("hh", hours.toString().replace(/^(\d)$/, '0$1'));
  };
  if (format.indexOf("ii") > -1) format = format.replace("ii", minutes.toString().replace(/^(\d)$/, '0$1'));
  if (format.indexOf("ss") > -1) format = format.replace("ss", seconds.toString().replace(/^(\d)$/, '0$1'));
  return format;
};


 client.login(ayarlar.token);
const Discord = require('discord.js');

exports.run = async (app, message, client) => {
  
let API = (app.ws.ping).toFixed(2)
    
message.channel.send(`:ping_pong: Pong! *${API}ms*`)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ping'
};
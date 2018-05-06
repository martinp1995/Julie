const Discord = require("discord.js");


module.exports.run = async (client, msg) => {


    var os = require('os');

  var embed = new Discord.RichEmbed()

  .setColor(0xFF5733) 
  .setThumbnail(client.user.avatarURL)
  .setAuthor(`${client.user.username} - Debug`)
  .addField(':triangular_flag_on_post: Nombre de serveurs', `${client.guilds.size}`, true)
  .addField(':busts_in_silhouette: Nombre d\'utilisateurs', `${client.users.size}`, true)  
  .addField(':sound: Nombre de connections', `${client.voiceConnections.size}`, true)
  .addField(':bust_in_silhouette: Developpeur du bot', client.users.get('240508683455299584').tag, false)
  .addField(':level_slider: RAM', `${Math.trunc((process.memoryUsage().heapUsed) / 1024 / 1000)} MB / ${Math.trunc(os.totalmem() / 1024 / 1000)} MB (${Math.round((Math.round(process.memoryUsage().heapUsed / 1024 / 1024) / Math.round(os.totalmem() / 1024 / 1024)) * 100)}%)`, false)
  .addField(':calendar_spiral: Dernière connexion', (Math.round(client.uptime / (1000 * 60 * 60))) + " Heure(s), " + (Math.round(client.uptime / (1000 * 60)) % 60) + " minute(s) et " + (Math.round(client.uptime / 1000) % 60) + " seconde(s)")
  .addField(':books: Lib', `Discord.js ${Discord.version}`, false)
  .setFooter(`demandé par @${msg.author.username}`)
  
msg.channel.send(embed);

}

module.exports.help = {
    name : "debug",
    usage: "-debug",
    description: "Donne les informations et les statistiques du bot"
}

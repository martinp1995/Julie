const Discord = require("discord.js");


module.exports.run = async (client, msg) => {


    var os = require('os');

  var embed = new Discord.RichEmbed()

  .setColor(0xBCFF78) 
  .setThumbnail(client.user.avatarURL)
  .setAuthor(`${client.user.username}`, client.user.avatarURL)
  .addField(client.I18n.translate`• Nombre de serveurs`, "`"+`${client.guilds.size}`+"`", true)
  .addField(client.I18n.translate`• Nombre d\'utilisateurs`, "`"+`${client.users.size}`+"`", true)  
  .addField(client.I18n.translate`• Nombre de connections`, "`"+`${client.voiceConnections.size}`+"`", true)
  .addField(client.I18n.translate`• Developpeur du bot`, "`"+client.users.get('240508683455299584').tag+"`", false)
  .addField(`• RAM`, "`"+`${Math.trunc((process.memoryUsage().heapUsed) / 1024 / 1000)} MB / ${Math.trunc(os.totalmem() / 1024 / 1000)} MB (${Math.round((Math.round(process.memoryUsage().heapUsed / 1024 / 1024) / Math.round(os.totalmem() / 1024 / 1024)) * 100)}%)`+"`", false)
  .addField(client.I18n.translate`• Dernière connexion`, "`"+(Math.round(client.uptime / (1000 * 60 * 60))) + " Heure(s), " + (Math.round(client.uptime / (1000 * 60)) % 60) + " minute(s) et " + (Math.round(client.uptime / 1000) % 60) + " seconde(s)"+"`")
  .addField(`• Lib`, "`"+`Discord.js ${Discord.version}`+"`", false)
  .setFooter(client.I18n.translate`demandé par @${msg.author.username}`)

msg.channel.send(embed);

}

module.exports.help = {
    name : "debug",
    usage: "debug",
    description: "Donne les informations et les statistiques du bot",
    type: "bot"
}

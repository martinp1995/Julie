const Discord = require("discord.js");

module.exports.run = async (client, msg) => {

    let embed = new Discord.RichEmbed()
        .setAuthor(`${client.user.username} - HELP`)
		.setThumbnail(client.user.avatarURL) 
        .setColor(client.fonctions.randomColor())
        .setDescription("Nombre de commandes: **"+ client.commands.map(c => c).length + "**\n\nVoici la liste des commandes:")
        .setFooter(`${client.user.username} © BOT Musique crée par Erisse#7460`)
    client.commands.forEach(c => {
       embed.addField(c.help.name, c.help.description);
    });

    msg.channel.send(embed);

}

module.exports.help = {
    name : "help",
    usage: "help",
    description: "Voir la liste des commandes du bot"
}


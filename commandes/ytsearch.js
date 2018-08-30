const Discord = require("discord.js");

module.exports.run = async (client, msg) => {

            let args = msg.content.split(" ").slice(1).join(" ")
            
            if (!args) return msg.channel.send(client.I18n.translate`⚠ Veuillez spécifier votre musique !`)
            
            client.fonctions.search(msg, args)

}

module.exports.help = {
    name : "ytsearch",
    usage: "ytsearch <lien youtube ou titre de musique>",
    description: "Rechercher une musique sur YouTube",
    type: "utilitaire"
}

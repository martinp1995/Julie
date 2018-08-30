const Discord = require("discord.js");

module.exports.run = async (client, msg) => {
                
                if (!msg.member.voiceChannel) return msg.channel.send(client.I18n.translate`⚠ Vous devez être connecté dans un salon-vocal !`)
                
                if(!msg.member.voiceChannel.joinable) return msg.channel.send(client.I18n.translate`⚠ Je n'ai pas la permission de \`rejoindre\` ou \`parler\` dans ce salon !`).catch(err => console.log(err));
                
                if(!msg.member.voiceChannel.speakable) return msg.channel.send(client.I18n.translate`⚠ Je n'ai pas la permission de \`rejoindre\` ou \`parler\` dans ce salon !`).catch(err => console.log(err));

                msg.member.voiceChannel.join()

            let args = msg.content.split(" ").slice(1).join(" ")
            
            if (!args) return msg.channel.send(client.I18n.translate`⚠ Veuillez spécifier un lien de playlist YouTube !`)
            
            client.fonctions.playlist(msg, client.fonctions.enqueue(msg.guild.id), args)

}

module.exports.help = {
    name : "playlist",
    usage: "playlist <lien playlist youtube>",
    description: "Donner l'ordre au bot de jouer votre playlist",
    type: "musique"
}



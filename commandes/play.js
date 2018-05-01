const Discord = require("discord.js");

module.exports.run = async (client, msg) => {

            if (!msg.guild.voiceConnection) {
                
                if (!msg.member.voiceChannel) return msg.channel.send(':warning: Vous devez être connecté dans un salon-vocal !')
                
                msg.member.voiceChannel.join()
            }

            let args = msg.content.split(" ").slice(1).join(" ")
            
            if (!args) return msg.channel.send(':warning Veuillez spécifier votre musique !')
            
            client.fonctions.play(msg, client.fonctions.enqueue(msg.guild.id), args)

}

module.exports.help = {
    name : "play",
    usage: "play <lien youtube ou titre de musique>",
    description: "Donner l'ordre au bot de jouer votre musique"
}

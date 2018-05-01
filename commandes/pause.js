const Discord = require("discord.js");

module.exports.run = async (client, msg) => {

            if (!msg.guild.voiceConnection) {
                
                if (!msg.member.voiceChannel) return msg.channel.send(':warning: Vous devez être connecté dans un salon-vocal !')
                
                msg.member.voiceChannel.join()
            }

            if(!msg.guild.voiceConnection.player.dispatcher) return msg.channel.send(':warning: Le bot n\'a pas reçu l\'ordre de jouer !');

            msg.guild.voiceConnection.player.dispatcher.pause()

            msg.channel.send(':pause_button: J\'ai mis votre musique en pause')
}

module.exports.help = {
    name : "pause",
    usage: "pause",
    description: "Mettre la musique en pause"
}

                
const Discord = require("discord.js");

module.exports.run = async (client, msg) => {

            if (!msg.guild.voiceConnection) {
                
                if (!msg.member.voiceChannel) return msg.channel.send(':warning: Vous devez être connecté dans un salon-vocal !')
                
                msg.member.voiceChannel.join()
            }

            if(!msg.guild.voiceConnection.player.dispatcher || msg.guild.voiceConnection.player.dispatcher.paused) return msg.channel.send(':warning: Le bot ne joue pas !');

                msg.guild.voiceConnection.player.dispatcher.end()   
                msg.channel.send(':fast_forward: Changement de la musique en cours !');
}

module.exports.help = {
    name : "skip",
    usage: "skip",
    description: "Passer à la musique suivante"
}

                
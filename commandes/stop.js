const Discord = require("discord.js");

module.exports.run = async (client, msg) => {

            if (!msg.guild.voiceConnection) {
                
                if (!msg.member.voiceChannel) return msg.channel.send(':warning: Vous devez être connecté dans un salon-vocal !')
                
            }

            if(!msg.guild.voiceConnection.player.dispatcher || msg.guild.voiceConnection.player.dispatcher.paused) return msg.channel.send(':warning: Le bot ne joue pas !');

                msg.guild.voiceConnection.player.dispatcher.end()
            
            let queue = client.fonctions.enqueue(msg.guild.id);
                
                msg.channel.send(`:white_check_mark: Je me suis bien arrêté`);

                if (queue.length == 0) return;

                for (var i = queue.length - 1; i >= 0; i--) {
                    queue.splice(i, 1);
                }
}

module.exports.help = {
    name : "stop",
    usage: "stop",
    description: "Faire stop la queue et la mise en marche de la musique"
}


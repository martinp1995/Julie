const Discord = require("discord.js");

module.exports.run = async (client, msg) => {

            if (!msg.guild.voiceConnection) {
                
                if (!msg.member.voiceChannel) return msg.channel.send(':warning: Vous devez être connecté dans un salon-vocal !')
                
                msg.member.voiceChannel.join()
            }

            if(!msg.guild.voiceConnection.player.dispatcher || msg.guild.voiceConnection.player.dispatcher.paused) return msg.channel.send(':warning: Le bot ne joue pas !');

                let queue = client.fonctions.enqueue(msg.guild.id);
            
                if (queue.length == 0) return message.channel.send(":warning: Il n'y a **aucunes** musiques dans la queue !").then(response => { response.delete(5000) });
                
                 client.fonctions.play(msg, queue, queue[0].link)            
}

module.exports.help = {
    name : "repeat",
    usage: "repeat",
    description: "Faire répéter la première musique de la file d'attente"
}

                
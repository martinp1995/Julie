const Discord = require("discord.js");

module.exports.run = async (client, msg) => {

            if (!msg.guild.voiceConnection) {
                
                if (!msg.member.voiceChannel) return msg.channel.send(':warning: Vous devez être connecté dans un salon-vocal !')
                
                msg.member.voiceChannel.join()
            }

            if(!msg.guild.voiceConnection.player.dispatcher || msg.guild.voiceConnection.player.dispatcher.paused) return msg.channel.send(':warning: Le bot ne joue pas !');

          let queue = client.fonctions.enqueue(msg.guild.id);
            
            if (queue.length == 0) return msg.channel.send(":warning: Il n'y a **aucunes** musiques dans la queue !");
                
                msg.channel.send(`:microphone: Actuellement en joue: \`${queue[0].title}\` | Ajouté par \`${queue[0].requested}\``);               

}

module.exports.help = {
    name : "np",
    usage: "np",
    description: "Voir la musique actuellement en joue"
}


                

            

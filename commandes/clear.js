const Discord = require("discord.js");

module.exports.run = async (client, msg) => {

            if (!msg.guild.voiceConnection) {
                
                if (!msg.member.voiceChannel) return msg.channel.send(':warning: Vous devez être connecté dans un salon-vocal !')
                
                msg.member.voiceChannel.join()
            }

            if(!msg.guild.voiceConnection.player.dispatcher || msg.guild.voiceConnection.player.dispatcher.paused) return msg.channel.send(':warning: Le bot ne joue pas !');

          let queue = client.fonctions.enqueue(msg.guild.id);
            
            if (queue.length == 0) return msg.channel.send(":warning: Il n'y a **aucunes** musiques dans la queue !");
                
                msg.channel.send(":wastebasket: La file d'attente a été supprimée");

                for (var i = queue.length - 1; i >= 0; i--) {
                    if (queue.length == 1) return;
                    queue.splice(i, 1);
                }
                

}

module.exports.help = {
    name : "clear",
    usage: "clear",
    description: "Supprimer la file d'attente de musique du serveur"
}


                

            

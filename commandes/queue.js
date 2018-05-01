const Discord = require("discord.js");

module.exports.run = async (client, msg) => {

            if (!msg.guild.voiceConnection) {
                
                if (!msg.member.voiceChannel) return msg.channel.send(':warning: Vous devez être connecté dans un salon-vocal !')
                
                msg.member.voiceChannel.join()
            }

            if(!msg.guild.voiceConnection.player.dispatcher || msg.guild.voiceConnection.player.dispatcher.paused) return msg.channel.send(':warning: Le bot ne joue pas !');

          let queue = client.fonctions.enqueue(msg.guild.id);
            
            if (queue.length == 0) return msg.channel.send(":warning: Il n'y a **aucunes** musiques dans la queue !");
            let text = '';
            for (let i = 0; i < queue.length; i++) {
                text += `${(i + 1)}. ${queue[i].title} | Ajouté par ${queue[i].requested}\n`
            };
            msg.channel.send(":globe_with_meridians: Liste de la file d'attente:\n```" + text + "```");

}

module.exports.help = {
    name : "queue",
    usage: "queue",
    description: "Voir la file d'attente de musique du serveur"
}



            

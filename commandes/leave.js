const Discord = require("discord.js");

module.exports.run = async (client, msg) => {

            if (!msg.guild.voiceConnection) {
                
                if (!msg.member.voiceChannel) return msg.channel.send(':warning: Vous devez être connecté dans un salon-vocal !')
                
            }

                msg.member.voiceChannel.leave();
            
            let queue = client.fonctions.enqueue(msg.guild.id);

                msg.channel.send(`:white_check_mark: Je suis bien sortie du salon-vocal`);

                if (queue.length == 0) return; 

                for (var i = queue.length - 1; i >= 0; i--) {
                    queue.splice(i, 1);
                }
}

module.exports.help = {
    name : "leave",
    usage: "leave",
    description: "Faire sortir le bot du salon-vocal"
}
